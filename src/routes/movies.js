import { Router } from 'express';
import movies from '../models/movies';
import { v4 as uuid } from 'uuid';
import pool from '../models/pgconnection';

const router = Router();
let moviesDB = movies;

// fetch all movies

router.get('/', async (_, res) => {
  try {
    const movies = await pool.query('SELECT * FROM movies')
    res.json(movies.rows);
  } catch(error) {
    console.error('Failure connecting to db ' + error)
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

// fetch a movie by ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  const movie = moviesDB.find(movie => movie.id === id );

  movie ? res.json(movie) : res.status(404).json({ message: "There's no movie that matches the given ID"});
})

// create a movie
router.post('/', async (req, res) => {

  let newMovie = req.body.title;
  try {
    const movies = await pool.query(
      `INSERT INTO movies (title) VALUES ($1)`, [newMovie]
    );
    res.json(movies.rows);
  } catch(error) {
    console.error('Failure connecting to db ' + error)
    res.status(500).json({ error: 'Internal server error' });
  }
})

// delete a movie
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(`DELETE FROM movies WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Movie not found' })
    } else {
      res.json({ message: 'Movie deleted succesfully' })
    }
  } catch (error) {
    console.error('Error executing query ', error);
    res.status(500).json({ error: 'Internal server error'});
  }

})

// update an existing movie
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const updatedMovie = req.body;

  try {
    const result = await pool.query(
      `UPDATE movies SET title = $1 WHERE id = $2`, [updatedMovie.title, id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Movie not found' })
    } else {
      res.json({ message: 'Movie updated succesfully' })
    }
  } catch (error) {
    console.error('Error executing query ', error);
    res.status(500).json({ error: 'Internal server error'});
  }
})

export default router;