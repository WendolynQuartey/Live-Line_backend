import express from "express";
import { getClosestStations } from "../utilities/mtaHelper.js"

const router = express.Router();

router.route("/closest-stations").get( getClosestStations );


export default router;
