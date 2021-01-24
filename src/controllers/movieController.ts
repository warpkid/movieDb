import * as express from "express";
import { Movie } from "./../db/models/Movie";

class MovieController {
  public path = "/movies";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllMovies);
    this.router.get(this.path + "/:id", this.getAllMovies);
    this.router.post(this.path, this.createMovie);
    this.router.patch(this.path + "/:id", this.updateMovie);
    this.router.delete(this.path + "/:id", this.deleteMovie);
  }

  getAllMovies = async (
    request: express.Request,
    response: express.Response
  ) => {
    const movies = await Movie.find();
    response.send(movies);
  };

  createMovie = async (
    request: express.Request,
    response: express.Response
  ) => {
    const movie = new Movie();
    movie.title = request.body.title;
    movie.plot_summary = request.body.plot_summary;
    movie.duration = request.body.duration;
    await movie.save();
    response.send(movie);
  };

  updateMovie = async (
    request: express.Request,
    response: express.Response
  ) => {
    const movie = await Movie.findOne({
      where: {
        id: request.params.id,
      },
    });
    if (movie) {
      movie.title = request.body.title;
      movie.plot_summary = request.body.plot_summary;
      movie.duration = request.body.duration;
      await movie.save();
      response.send(movie);
    } else {
      response.status(404).send({ message: "Movie not found" });
    }
  };

  deleteMovie = async (
    request: express.Request,
    response: express.Response
  ) => {
    const movie = await Movie.findOne({
      where: {
        id: request.params.id,
      },
    });
    if (movie) {
      await movie.remove();
      response.json({ message: "Movie deleted" });
    } else {
      response.status(404).send({ message: "Movie not found" });
    }
  };
}

export default MovieController;
