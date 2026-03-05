import mongoose from "mongoose";

const favoritesSchema = new mongoose.Schema(
   {
      userId: {
         type: num,
         unique: num,
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
            type: num,
         },
         latitude: {
            type: num,
         },
      }
   }

)

export default mongoose.model("Favorites", favoritesSchema);