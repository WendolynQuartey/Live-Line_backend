import express from "express";
import User from "../models/userSchema.js";

const router = express.Router();

router.route("/login")
   // Create
   .post(async (req, res) => {
      try {
         const user = await User.findOne({email: req.body.email});
         if (!user) return res.status(400).json({error: "No account found for this email"});
   
         if (req.body.password !== user.password) {
            return res.status(401).json({error: "Incorrect password"});
         }
         
         res.json({
            message: "Login successful",
            user: {
               id: user._id,
               name: user.name,
               email: user.email,
               location: user.location
            }
         });
      } catch (error) {
         res.status(500).json({error: error.message});
      }
   })
 
router.route("/signup")
   // Create
   .post(async (req, res) => {
      try {
         const existing = await User.findOne({email: req.body.email});
         if (existing) return res.status(400).json({error: "An account for this email already exists"});
   
         const newUser = new User(req.body);
         await newUser.save();
   
         res.status(201).json({
            message: "Account created!",
            user: { 
               id: newUser._id,
               name: newUser.name, 
               email: newUser.email, 
               location: newUser.location},
            }) 
      } catch (error) {
         res.status(500).json({error: error.message});
      }
   })


router.route("/:id")
   // Update
   .put(async (req, res) => {
      let updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after', runValidators: true});
      if(!updateUser) return res.status(404).json({error: "User Not Found!"});
      else res.json(updateUser);
   })
   // Delete
   .delete(async (req, res) => {
      let deletedUser = await User.findByIdAndDelete(req.params.id);
      if(!deletedUser) return res.status(404).json({error: "User Not Found!"});
      else res.json(deletedUser);
   })
   // Show One User
   .get(async (req, res) => {
      let oneUser = await User.findById(req.params.id);
      if(!oneUser) return res.status(404).json({error: "User Not Found!"});
      else res.json(oneUser);
   });

export default router;