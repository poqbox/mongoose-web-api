import mongoose from "mongoose"


const stuff = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stuff: []
})


export default mongoose.model("Stuff", stuff)