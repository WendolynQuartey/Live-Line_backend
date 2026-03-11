import mongoose from "mongoose";

const pinnedLinesSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      stationId: {
         type: String,
         required: true,
      },
      stationName: {
         type: String,
         required: true,
      },
      routes: [{type: String}],
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

export default mongoose.model("PinnedLine", pinnedLinesSchema);