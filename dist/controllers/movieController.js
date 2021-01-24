"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const Movie_1 = require("./../db/models/Movie");
class MovieController {
    constructor() {
        this.path = "/movies";
        this.router = express.Router();
        this.getAllMovies = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const movies = yield Movie_1.Movie.find();
            response.send(movies);
        });
        this.createMovie = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const movie = new Movie_1.Movie();
            movie.title = request.body.title;
            movie.plot_summary = request.body.plot_summary;
            movie.duration = request.body.duration;
            yield movie.save();
            response.send(movie);
        });
        this.updateMovie = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const movie = yield Movie_1.Movie.findOne({
                where: {
                    id: request.params.id,
                },
            });
            if (movie) {
                movie.title = request.body.title;
                movie.plot_summary = request.body.plot_summary;
                movie.duration = request.body.duration;
                yield movie.save();
                response.send(movie);
            }
            else {
                response.status(404).send({ message: "Movie not found" });
            }
        });
        this.deleteMovie = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const movie = yield Movie_1.Movie.findOne({
                where: {
                    id: request.params.id,
                },
            });
            if (movie) {
                yield movie.remove();
                response.json({ message: "Movie deleted" });
            }
            else {
                response.status(404).send({ message: "Movie not found" });
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.getAllMovies);
        this.router.get(this.path + "/:id", this.getAllMovies);
        this.router.post(this.path, this.createMovie);
        this.router.patch(this.path + "/:id", this.updateMovie);
        this.router.delete(this.path + "/:id", this.deleteMovie);
    }
}
exports.default = MovieController;
//# sourceMappingURL=movieController.js.map