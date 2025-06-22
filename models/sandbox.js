import mongoose from "mongoose"


const sandbox = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stuff: [],
  size: {
    length: {
      type: Number,
      min: 0,
      required: true
    },
    width: {
      type: Number,
      min: 0,
      required: true
    },
    height: {
      type: Number,
      min: 0,
      required: true
    }
  },
  volume: {
    type: Number,
    min: 0
  },
  units: {
    type: String,
    default: "m",
    required: true
  }
})
sandbox.pre("save", function(next) {
  this.volume = this.size.length * this.size.width * this.size.height
  next()
})
sandbox.index({name: 1})
sandbox.index({volume: 1})


export default mongoose.model("Sandbox", sandbox)