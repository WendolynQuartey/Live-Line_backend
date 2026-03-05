import mongoose from "mongoose";

const favoritesSchema = new mongoose.Schema(
   {
      userId: {
         type: Number,
         unique: true,
         required: true,
      },
      category: {
         type: String,
         enum: ["Home", "Work", "School"],
      },
      locationAddress: {
         type: String,
         required: true,
      },
      location: {
         longitude: {
            type: Number,
         },
         latitude: {
            type: Number,
         },
      }
   }

)

export default mongoose.model("Favorites", favoritesSchema);