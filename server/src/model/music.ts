import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  singers: {
    type: [String],
    required: true
  },
  mainCover: String,
  sideCover: String,
  path: {
    type: String,
    required: true
  }
})


export default mongoose.model("music", musicSchema)
