import Joi from "joi";
import Genre from "../model/genres.js";

const inputValidationHandler = (movie) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    type: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(10).max(255).required(),
  })
    .with("id", "title")
    .with("type", "description");

  return schema.validate(movie);
};


/***
========================
@desc: Get all genres
========================
|@access: Public
***/ 
export const getAllGenre = async (req, res) => {
  try {
    const genre = await Genre.find();
    res.send(genre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

/***
========================
@desc: Get genreById
========================
|@access: Public
***/ 
export const getSingleGenre = async (req, res) => {
  const { id } = req.params;

  try {
    const neededGenre = await Genre.findById(id);

    if (!neededMovie) {
      return res.status(404).send("There is no movie with the given id");
    }

    res.status(200).send(neededGenre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

/***
========================
@desc: Create new genre
========================
|@access: Private
***/ 
export const createGenre = async (req, res) => {
  const { name, type, description } = req.body;

  try {
    const { error, value } = inputValidationHandler({
      name,
      type,
      description,
    });

    if (error) {
      console.log(`Error: ${error}`);
      return res.status(400).send(error.message);
    }

    let newGenre = new Genre(value);
    const genre = await newGenre.save();
    res.status(200).json(genre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error, can not create genre");
  }
};

/***
====================
@desc: Update genre
====================
|@access: Private
***/
export const updateGenre = async (req, res) => {
  const { name, type, description } = req.body;

  const updatedMovie = {};
  if (name) updatedMovie.name = name;
  if (type) updatedMovie.type = type;
  if (description) updatedMovie.description = description;

  try {
    let newMovie = await Genre.findById(req.params.id);

    if (!newMovie) {
      return res.status(404).send("There is no genre with the given id");
    }

    const { error } = inputValidationHandler(updatedMovie);

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
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error, can not update genre");
  }
};

/***
=====================
@desc: Delete genre
=====================
|@access: Private
***/ 
export const deleteGenre = async (req, res) => {
  const { id } = req.params;

  try {
    let genre = await Genre.findByIdAndRemove(id);

    if (!genre) {
      return res.status(404).send("There is no genre with the given id");
    }

    res.json({ msg: `genre: '${genre.name}' deleted.` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error, can not delete genre");
  }
};
