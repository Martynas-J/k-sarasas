import mongoose from "mongoose";

const { Schema } = mongoose;

const statisticsSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    itemName: {
        type: String,
        required: true,
      },
    count: {
      type: Number,
      required: true,
    },
    action: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: {
      createdAt: true, 
      updatedAt: false, 
    },
  }
);

let statisticsModel;
try {
  statisticsModel = mongoose.model("K_statistics");
} catch (error) {
  statisticsModel = mongoose.model("K_statistics", statisticsSchema);
}

export default statisticsModel;
