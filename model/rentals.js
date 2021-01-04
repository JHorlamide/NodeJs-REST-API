import Joi from "joi";
import mongoose from "mongoose";
import { JoiObjectIdValidation } from "../startup/validation.js";

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Number,
        required: true,
        min: 5,
        max: 50,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },

  deteReturned: {
    type: Date,
  },

  rentalFee: {
    type: {
      type: Number,
      min: 0,
    },
  },
});

export const Rental = mongoose.model("Rental", rentalSchema);

export const rentalValidation = (rental) => {
  const schema = Joi.object({
    customerId: JoiObjectIdValidation().required(),
    movieId: JoiObjectId().required(),
  });

  return schema.validate(rental);
};
