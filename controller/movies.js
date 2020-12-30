import Genre from "../model/genres.js";
import Movie, { validateMovie } from "../model/movie.js";

/***
========================
@desc: Get all movies
========================
|@access: Public
***/
export const getAllMovies = async (req, res) => {
  try {
    const genres = await Movie.find();
    res.send(genres);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

/***
========================
@desc: Create new movie
========================
|@access: Private
***/
export const createMovie = async (req, res) => {
  const { title, genreId, numberInStock, dailyRentalRate } = req.body;

  const { error } = validateMovie({
    title,
    genreId,
    numberInStock,
    dailyRentalRate,
  });

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const genre = await Genre.findById(genreId);
    if (!genre) {
      return res.status(400).send("Invalide genre id.");
    }

    const movie = new Movie({
      title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock,
      dailyRentalRate,
    });

    await movie.save();
    res.send(movie);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

/***
========================
@desc: Delete movie
========================
|@access: Private
***/
export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).send("There is no movie with the given Id.");
    }

    await Movie.findByIdAndRemove(id);
    res.send({ msg: `Movie: ${movie.title} removed successfully.` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error, Unable to delete movie");
  }
};
