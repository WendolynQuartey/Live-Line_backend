import express from "express";
import PinnedLine from "../models/pinnedLinesSchema.js";

const router = express.Router();

router.route("/")
   // Create
   .post(async (req, res) => {
      try {
         const existing = await PinnedLine.findOne({
            userId: req.body.userId,
            route: req.body.route
         });
         if (existing) return res.status(400).json({error: "Train line already pinned"});
         
         const newPin = new PinnedLine(req.body);
         await newPin.save();
         res.status(201).json(newPin);
        
      } catch (error) {
         res.status(500).json({error: error.message});
      }
   })
   // Read - Show All
   .get(async (req, res) => {
      try {
         const { userId } = req.query;
         let allPins = await Favorite.find({userId});
   
         res.json(allPins);
      } catch (error) {
          res.status(500).json({error: error.message});
      }
   });

router.route("/:id")
   // Delete
   .delete(async (req, res) => {
      try {
         const deletedPin = await Favorite.findByIdAndDelete(req.params.id);
         if(!deletedPin) return res.status(404).json({error: "Pinned line not found!"});
         else res.json(deletedPin);
      } catch (error) {
         res.status(500).json({error: error.message})
      }
   })

export default router;