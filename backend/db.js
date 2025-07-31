require('dotenv').config();
const {Client} = require('pg');
const client = new Client({
    user: process.env.DB_USER,
    localhost: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS tasks(
id SERIAL PRIMARY KEY,
task TEXT,
status TEXT DEFAULT 'incomplete'
)`;

const fetchAllTasksQuery = `SELECT * FROM tasks WHERE status = $1`;

const insertTasksQuery = `INSERT INTO tasks(task) VALUES($1) RETURNING *`;

const updateTasksQuery = `UPDATE tasks SET status = $1 WHERE id = $2`;

const deleteTasksQuery = `DELETE FROM tasks WHERE id = $1 RETURNING *`;



module.exports = { client, createTableQuery, insertTasksQuery, updateTasksQuery, deleteTasksQuery, fetchAllTasksQuery };