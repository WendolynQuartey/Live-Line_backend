import express from "express";
import gtfsRealtimeBindings from "gtfs-realtime-bindings";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const cache = {
   ace: { data: null, timestamp: null},
   oneTwoThree: { data: null, timestamp: null},
   nqrw: { data: null, timestamp: null},
   bdfm: { data: null, timestamp: null},
   g: { data: null, timestamp: null},
   jz: { data: null, timestamp: null},
   l: { data: null, timestamp: null},
   seven: { data: null, timestamp: null},
   TTL: 15000
}; // 15 seconds cache since MTA updates every 30 seconds

async function  fetchMetroData( feedKey, feedUrl, res, next) {
   const cachedItem = cache[feedKey];

   if (cachedItem.data && Date.now() - cachedItem.timestamp < cache.TTL){
      console.log(`[${feedKey}] Returning cached data`);
      return res.json({
         ...cachedItem.data,
         _cached: true,
         _timestamp: new Date(cachedItem.timestamp).toISOString()
      });
   }

   try {
      console.log(`[${feedKey}]Fetching fresh data from MTA...`);

      const response = await axios.get(feedUrl,{
         responseType: "arraybuffer",
         headers: {
            "Accept": "application/x-google-protobuf"
         }
      });

      const feed = gtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
         new Uint8Array(response.data)
      );

      const data = JSON.parse(JSON.stringify(feed));

      cachedItem.data = data;
      cachedItem.timestamp = Date.now();

      res.json(data);
   } catch (error) {
      console.error(`[${feedKey}] Error:`, error.message);


      if(cachedItem.data){
         console.log(`[${feedKey}] Returning stale cache due to error`);

         return res.json({
            ...cachedItem.data,
            _stale: true,
            _error: error.message,
            _timestamp: new Date(cachedItem.timestamp).toISOString()
         });
      }
      next(error);
   }
   
}



router.route("/ace").get(async (req, res, next) => {
   await fetchMetroData(
      "ace",
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace",
      res,
      next
   );
});


router.route("/123").get(async (req, res, next) => {
   await fetchMetroData(
      "oneTwoThree",
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs",
      res,
      next
   );
});


router.route("/nqrw").get(async (req, res, next) => {
   await fetchMetroData(
      "nqrw",
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw",
      res,
      next
   );
});

router.route("/bdfm").get(async (req, res, next) => {
   await fetchMetroData(
      "bdfm",
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm",
      res,
      next
   );
});

router.route("/g").get(async (req, res, next) => {
   await fetchMetroData(
      "g",
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g",
      res,
      next
   );
});

router.route("/jz").get(async (req, res, next) => {
   await fetchMetroData(
      "jz",
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz",
      res,
      next
   );
});

router.route("/l").get(async (req, res, next) => {
   await fetchMetroData(
      "l",
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l",
      res,
      next
   );
});


export default router;
