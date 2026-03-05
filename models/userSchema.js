import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      name: { 
         type: String,
         required: true,
      },
      email:{ 
         type: String,
         unique: true,
         required: true,
      },
      password: { 
         type: String,
         unique: true,
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

export default mongoose.model("User", userSchema);