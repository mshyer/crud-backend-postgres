import express from 'express';
// import { Pool } from 'pg';

// const $VPP = process.env.VPP
// const pool = new Pool({
//   user: 'mikmik',
//   host: 'localhost',
//   database: 'vps_practice_project_db',
//   password: $VPP,
//   port: 5432,
// });

const app = express();
import cors from 'cors';
import routes from './routes'

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/books', routes.books);
app.use('/api/movies', routes.movies);


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})