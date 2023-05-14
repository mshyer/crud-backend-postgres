import { Pool } from 'pg';

const $VPP = process.env.VPP
const pool = new Pool({
  host: 'localhost',
  database: 'vpsdatabase',
  password: '',
  port: 5432,
});


export default pool;
