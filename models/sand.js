import mongoose from "mongoose"


const sand = new mongoose.Schema({
  material: {
    type: String,
    enum: [
      "sand",
      "dirt"
    ],
    default: "sand",
    required: true
  },
  amount: {
    type: Number,
    min: 0,
    required: true
  },
  units_cubed: {
    type: String,
    default: "m",
    required: true
  }
})
sand.index({material: 1})
sand.index({amount: 1})


export default mongoose.model("Sand", sand)