var express = require('express');
var router = express.Router();

const joi = require('joi');

const Movie = require("../models/movie");

/*let movies = 
[
{
  id: 1, name: "Los Vengadores"
},
{
  id: 2, name: "Spiderman"
},
{
  id: 3, name: "Doctor Strange"
},
];*/

const schema = joi.object
({
  name: joi.string().min(3).max(30).required()
});

router.get('/movies', function(req, res, next) 
{
  Movies.findAll().then(movies => 
    {
      res.send(movies);
    })
});

router.get('/movies/:id', function(req, res, next) 
{
  Movie.findByPk(req.params.id).then(movie =>
  {
    if (movie === null)
      return res.status(404).send("The movie with the given id was not found");
    res.send(movie);
  })
  /*
  const movie  = movies.find((m) => m.id === parseInt(req.params.id));
  if(!movie)
    return res.status(404).send("The movie with the given id was not found");
  res.send(movie);*/
});

router.post('/movies', function(req, res, next) 
{
  const { error } = schema.validate(req.body);
  if (error)
    return res.status(404).send(error.details[0].message)

  Movie.create(req.body).then(movie =>
  {
    res.send(movie);
  })
  /*
  const movie = { id: movies.length + 1, name: req.body.name };
  movies.push(movie);
  res.send(movie);*/
});

router.put('/movies/:id', function(req, res, next) 
{
  Movie.update(req.body, {where: 
  {
    id: req.params.id
  }}).then(result =>
  {
    if (result[0] === 0)
      return res.status(404).send("The movie with the given id was not found");
    res.send("Movie updated");
  })
  /*
  const movie = movies.find((m) => m.id === parseInt(req.params.id));

  if (!movie)
  {
    return res.status(404).send("The movie with the given id was not found");
  }

  movie.name = req.body.name;
  res.send(movies);*/
});

router.delete('/movies/:id', function(req, res, next) 
{
  Movie.destroy(
  {
    where: 
    {
      id: req.params.id
    }
  }).then(result =>
  {
    if (result === 0)
      return res.status(404).send("The movie with the given id was not found");
    res.sendStatus(204);
  });
  /*
  const movie = movies.find((m) => m.id === parseInt(req.params.id));

  if (!movie)
  {
    return res.status(404).send("The movie with the given id was not found");
  }

  movies = movies.filter(m => m.id !== parseInt(req.params.id));
  res.sendStatus(204);*/
});


module.exports = router;
