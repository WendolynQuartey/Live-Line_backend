import mongoose from "mongoose";

const pinnedLinesSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      routes:{
         type: String,
         required: true,
      }
      }
)

export default mongoose.model("PinnedLine", pinnedLinesSchema);