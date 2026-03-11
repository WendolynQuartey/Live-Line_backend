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

      const stations = response.data.data;
      const now = new Date();

      const result = stations.map(station => ({
         id: station.id,
         name: station.name,
         routes: station.routes,
         location: station.location,
         distance: getDistance(
            {latitude: parseFloat(lat), longitude: parseFloat(lon)},
             {latitude: station.location[0], longitude: station.location[1]},
         ),
         upcomingTrains: {
            N: station.N.filter(train => new Date(train.time) >= now),
            S: station.S.filter(train => new Date(train.time) >= now),
         }
      }))
         .sort((x, y) => x.distance - y.distance)
         .slice(0, 5); // 5 closest stations

      res.json(result);
   } catch (error) {
      console.error("Error fecthing MTAPI data: ", error.message);
      next(error);
   }
}