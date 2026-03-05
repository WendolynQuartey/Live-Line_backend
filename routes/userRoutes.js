import express from "express";
import User from "../models/userSchema.js";

const router = express.Router();

router.route("/")
   // Create
   .post(async (req, res) => {
      let newUser = await User.insertOne(req.body);

      res.json(newUser);
   })
   // Read - Show All
   .get(async (req, res) => {
      let allUsers = await User.find({});

      res.json(allUsers);
   });

export default router;