import express from 'express';
const router = express.Router();
import models from '../models';
import pool from '../models/pgconnection';

router.get('/', async (_, res) => {
  try {
    const books = await pool.query('SELECT * FROM books')
    res.json(books.rows);
  } catch(error) {
    console.error('Failure connecting to db ' + error)
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = models.books.find(book => book.id === id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).end();
  }
});

// delete a book
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(`DELETE FROM books WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Book not found' })
    } else {
      res.json({ message: 'Book deleted succesfully' })
    }
  } catch (error) {
    console.error('Error executing query ', error);
    res.status(500).json({ error: 'Internal server error'});
  }

})

// update an existing book
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const updatedBook = req.body;

  try {
    const result = await pool.query(
      `UPDATE books SET title = $1 WHERE id = $2`, [updatedBook.title, id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Book not found' })
    } else {
      res.json({ message: 'Book updated succesfully' })
    }
  } catch (error) {
    console.error('Error executing query ', error);
    res.status(500).json({ error: 'Internal server error'});
  }
})

export default router;