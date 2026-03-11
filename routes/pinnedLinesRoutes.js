import express from "express";
import PinnedLine from "../models/pinnedLinesSchema.js";

const router = express.Router();

router.route("/")
   // Create
   .post(async (req, res) => {
      try {
         const existing = await PinnedLine.findOne({
            userId: req.body.userId,
            stationId: req.body.stationId
         });
         if (existing) return res.status(400).json({error: "Train line already pinned"});
   
         res.json(newFavorite);
      } catch (error) {
         res.status(500).json({error: error.message})
      }
   })
   // Read - Show All
   .get(async (req, res) => {
      let allFavorites = await Favorite.find({});

      res.json(allFavorites);
   });

router.route("/:id")
   // Update
   .put(async (req, res) => {
      let updateFavorite = await Favorite.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after', runValidators: true});
      if(!updateFavorite) return res.status(404).json({error: "User Not Found!"});
      else res.json(updateFavorite);
   })
   // Delete
   .delete(async (req, res) => {
      let deletedFavorite = await Favorite.findByIdAndDelete(req.params.id);
      if(!deletedFavorite) return res.status(404).json({error: "User Not Found!"});
      else res.json(deletedFavorite);
   })
   // Show One User
   .get(async (req, res) => {
      let oneFavorite = await Favorite.findById(req.params.id);
      if(!oneFavorite) return res.status(404).json({error: "User Not Found!"});
      else res.json(oneFavorite);
   });

export default router;