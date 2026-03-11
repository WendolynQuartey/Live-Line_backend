import axios from "axios";
import {getDistance} from "geolib";
import dotenv from "dotenv";

dotenv.config();

// Show closest trains to user locations
export async function getClosestStations(req, res, next) {
   try {
      const { lat, lon} = req.query;

      const response = await axios.get(`${process.env.MTAPI_URL}/by-location`, {
         params: {lat, lon}
      });

      console.log("Full response:", JSON.stringify(response.data, null, 2));

      const stations = response.data.data;

      const closest = stations.map(station => ({
         ...station,
         distance: getDistance(
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
         upcomingTrains: station.upcomingTrains.filter(train => new Date(train.arrival_time) >= now)
      }))



      res.json(result);
   } catch (error) {
      console.error("Error fecthing MTAPI data: ", error.message);
      next(error);
   }
}