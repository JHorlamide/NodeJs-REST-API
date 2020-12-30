import mongoose from "mongoose";

export const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },

  type: {
    type: String,
    // required: true,
    minlength: 5,
    maxlength: 255,
  },

  description: {
    type: String,
    // required: true,
    minlength: 5,
    maxlength: 255,
  },
});

const Genre = mongoose.model("Genre", genreSchema);
export default Genre;
