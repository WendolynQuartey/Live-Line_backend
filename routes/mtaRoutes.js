import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const API_KEY = process.env.API_KEY;
// console.log("API Key loaded:", API_KEY ? "✅ Yes" : "❌ No");
// console.log("API Key first 4 chars:", API_KEY?.substring(0, 4));
const baseUrl = "https://transit.land/api/v2/rest";

router.route("/nearby").get(async (req, res) => {
   try {
      const { lat, lon } = req.query;

      console.log(`Fetching stations near ${lat}, ${lon}`);

      // Get nearby stops
      const stopsRes = await axios.get("https://transit.land/api/v2/rest/stops", {
         params: {
            apikey: API_KEY,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            radius: 500, // 10 - 12 minute walk away
            limit: 5 
         }
      })

      const stops = stopsRes.data.stops;

      // Get departure time at each stop
      const stations = await Promise.all( // runs at the same time
         stops.map(async (stop) => {
            try {
               const departRes = await axios.get(
                  `https://transit.land/api/v2/rest/stops/${stop.onestop_id}/departures`,
                  {
                     params: {
                        apikey: API_KEY,
                        next: 1800 // Get next 30 minutes of departures
                     }
                  }
               )
               return {
                  name: stop.stop_name,
                  distance: Math.round(stop.distance),
                  routes: stop.route_stops?.map(r => r.route.route_short_name).filter(Boolean),
                  departures: (departRes.data.departures).slice(0, 3).map(d => {
                     const minutes = Math.round((new Date(d.departure?.time) - new Date()) / 60000)
                     return {
                        route: d.trip.route.route_short_name,
                        destination: d.trip.trip_headsign,
                        minutes: minutes < 0 ? 0 : minutes
                     }
                  })
               }
            } catch (error) {
               console.log(`Couldn't get departures for ${stop.stop_name}`);
               return {
                  name: stop.stop_name,
                  distance: Math.round(stop.distance),
                  routes: stop.route_stops?.map(r => r.route.route_short_name).filter(Boolean) || [],
                  departures: []
               }
            }
         })
      );

      // Sort by distance 
      res.json({
         userLocation: {lat, lon},
         stations: stations.sort((x,y) => x.distance - y.distance)
      });

   } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({error: "Failed to fetch transit data"});
   }
})


export default router;
