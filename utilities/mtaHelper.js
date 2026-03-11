import axios from "axios";
import geolib from "geolib";

// Show closest trains to user locations
export async function getClosestStations(req, res, next) {
   try {
      const { lat, lon} = req.query;
      const stations = await mt.getTrains();

      const closest = stations.map(station => ({
         ...station,
         distance: geolib.getDistance(
            {latitude: parseFloat(lat), longitude: parseFloat(lon)},
             {latitude: station.lat, longitude: station.lon},
         )
      }))
      .sort((x, y) => x.distance - y.distance)
      .slice(0,5); // 5 closest stations

      const now = new Date();
      const result = closest.map(station => ({
         name: station.name,
         line: station.line,
         distance: station.distance,
         upcomingTrains: station.upcomingTrains.filter(train => new Date(train.arrival_time >= now))
      }))



      res.json(closest);
   } catch (error) {
      next(error);
   }
}