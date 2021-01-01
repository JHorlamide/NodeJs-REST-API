import { Rental, rentalValidation } from "../model/rentals.js";
import { asyncMiddleware } from "../middleware/asyncMiddleware.js";
import Customer from "../model/customer.js";
import Movie from "../model/movie.js";
import mongoose from "mongoose";
import Fawn from "fawn";

Fawn.init(mongoose);

/***
========================
@desc: Get all rentals
========================
|@access: Public
***/
export const getAllRentals = asyncMiddleware(async (req, res) => {
  const rentals = await Rental.find().sort({ dateOut: -1 });
  res.send(rentals);
});

/***
===========================
@desc: Create new rentals
==========================
|@access: Private
***/
export const createRental = asyncMiddleware(async (req, res) => {
  const { customerId, movieId } = req.body;

  const { error } = rentalValidation({ customerId, movieId });

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findById(customerId);
  if (!customer) {
    return res.status(400).send("Invalid customer");
  }

  const movie = await Movie.findById(movieId);
  if (!movie) {
    return res.status(400).send("Invalid movie");
  }

  if (movie.numberInStock === 0) {
    return res.status(400).send("Movie not in stock");
  }

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  new Fawn.Task()
    .save("rentals", rental)
    .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
    .run();

  res.send(rental);
});

/***
======================
@desc: Delete rentals
======================
|@access: Private
***/
export const deleteRental = asyncMiddleware(async (req, res) => {
  const { id } = req.params;

  const rental = await Rental.findById(id);

  if (!rental) {
    return res.status(404).send("There is no rental with the given Id.");
  }

  await Rental.findByIdAndRemove(id);
  res.send({ msd: "Rental removed successfully." });
});
