import mongoose from "mongoose";
import Joi from "joi";
import { genreSchema } from "./genres.js";
import { JoiObjectIdValidation } from "../startup/validation.js";

const moviesSChem = new mongoose.Schema({
  genre: {
    type: genreSchema,
    required: true,
  },

  title: {
    type: String,
    required: true,
    trime: true,
    minlength: 5,
    maxlength: 255,
  },

  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },

  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

export const validateMovie = (movie) => {
  const schema = Joi.object({
    genreId: JoiObjectIdValidation().required(),
    title: Joi.string().min(5).max(50).required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });

  return schema.validate(movie);
};

const Movie = mongoose.model("Movie", moviesSChem);
export default Movie;
