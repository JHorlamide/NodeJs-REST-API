import mongoose from "mongoose";
import Joi from "Joi";

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

export const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    type: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(10).max(255).required(),
  })
    .with("id", "title")
    .with("type", "description");

  return schema.validate(genre);
};

const Genre = mongoose.model("Genre", genreSchema);
export default Genre;
