import Genre from "../model/genres.js";
import { validateGenre } from "../model/genres.js";
import { asyncMiddleware } from "../middleware/asyncMiddleware.js";

/***
========================
@desc: Get all genres
========================
|@access: Public
***/

export const getAllGenre = asyncMiddleware(async (req, res, next) => {
  const genre = await Genre.find();
  res.send(genre);
});

/***
========================
@desc: Get genreById
========================
|@access: Public
***/
export const getSingleGenre = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const neededGenre = await Genre.findById(id);

  if (!neededMovie) {
    return res.status(404).send("There is no movie with the given id");
  }

  res.status(200).send(neededGenre);
});

/***
========================
@desc: Create new genre
========================
|@access: Private
***/
export const createGenre = asyncMiddleware(async (req, res) => {
  const { name, type, description } = req.body;
  const { error, value } = validateGenre({
    name,
    type,
    description,
  });

  if (error) {
    console.log(`Error: ${error}`);
    return res.status(400).send(error.message);
  }

  let genre = new Genre(value);
  genre = await genre.save();
  res.status(200).json(genre);
});

/***
====================
@desc: Update genre
====================
|@access: Private
***/
export const updateGenre = asyncMiddleware(async (req, res) => {
  const { name, type, description } = req.body;

  const updatedMovie = {};
  if (name) updatedMovie.name = name;
  if (type) updatedMovie.type = type;
  if (description) updatedMovie.description = description;

  let newMovie = await Genre.findById(req.params.id);

  if (!newMovie) {
    return res.status(404).send("There is no genre with the given id");
  }

  const { error } = validateGenre(updatedMovie);

  if (error) {
    console.log(`Error msg: ${error}`);
    return res.status(400).send(error.message);
  }

  newMovie = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      $set: updatedMovie,
    },
    { new: true }
  );

  res.send(newMovie);
});

/***
=====================
@desc: Delete genre
=====================
|@access: Private
***/
export const deleteGenre = asyncMiddleware(async (req, res) => {
  const { id } = req.params;

  let genre = await Genre.findByIdAndRemove(id);

  if (!genre) {
    return res.status(404).send("There is no genre with the given id");
  }

  res.json({ msg: `genre: '${genre.name}' deleted.` });
});
