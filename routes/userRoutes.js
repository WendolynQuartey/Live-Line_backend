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

router.route("/:id")
   // Update
   .put(async (req, res) => {
      let updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after', runValidators: true});
      if(!updateUser) return res.status(404).json({error: "User Not Found!"});
      else res.json(updateUser);
   })
   .delete(async (req, res) => {
      let deletedUser = await User.findByIdAndDelete(req.params.id);
      if(!deletedUser) return res.status(404).json({error: "User Not Found!"});
      else res.json(deletedUser);
   })

export default router;