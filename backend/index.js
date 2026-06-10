const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// Create table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )
`);

// GET all todos
app.get('/todos', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
  res.json(result.rows);
});

// POST a new todo
app.post('/todos', async (req, res) => {
  const { text } = req.body;
  const result = await pool.query(
    'INSERT INTO todos (text) VALUES ($1) RETURNING *',
    [text]
  );
  res.json(result.rows[0]);
});

app.listen(4000, () => {
  console.log('Backend running on port 4000 - LIVE RELOAD IS WORKING FINE NOW!!!');
});
