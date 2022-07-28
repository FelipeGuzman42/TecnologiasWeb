var express = require("express");
const Joi = require("joi");
const Movie = require("../controllers/movie");

const checkToken = require("../jwt/checkToken");

var router = express.Router();

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

router.get("/movies", checkToken, (function (req, res, next) {
  Movie.getMovies().then(movies => {res.send(movies)});
}));

router.get("/movies/:id", checkToken, function (req, res, next) {
  Movie.getMovie(req.params.id).then((movie) => {
    if(movie == null)
      res.status(404).send("La película con el id no existe");
    res.send(movie);
  });
});

router.post("/movies", checkToken, function (req, res, next) {
  
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }

  Movie.createMovie(req.body).then((movie) => {
    res.send(movie);
  });
});

router.put("/movies/:id", checkToken, function (req, res, next) {
  movie.updateMovie(req.params.id, req.body).then((movie) => {
    if(movie.matchedCount === 0)
      return res.status(404).send("La película con el id no existe")
    res.send(movie);
  });
});


router.delete("/movies/:id", checkToken, function (req, res, next) {
  Movie.deleteMovie(req.params.id).then(movie =>{
    if(movie.deletedCount === 0)
      return res.status(404).send("La película con el id no existe")
    res.sendStatus(204);
  });
});

module.exports = router;
