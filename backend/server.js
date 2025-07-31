const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 5000;
const { client, createTableQuery, insertTasksQuery, updateTasksQuery, deleteTasksQuery, fetchAllTasksQuery } = require('./db');

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());


// PG Client
client.connect().then(() => console.log('DB Connected!')).catch(err => console.log('Err Msg: ' + err.message));

app.get('/', async (req, res) => {
    try{
        const check = await client.query(createTableQuery);
        // console.log(check);
        res.sendFile(path.join(__dirname, '../public/todo.html'));
        // res.status(200).json({mesage: 'DONE', checker : check});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Internal Server Error: ' + err.message);
    }
})

app.post('/task', async (req, res) => {
    try{
        const { task } = req.body;
        if (!task || task.trim() === '') {
            return res.status(400).json({ message: 'Task cannot be empty' });
        }
        const addedTask = await client.query(insertTasksQuery, [task]);
        // console.log(addedTask.rows);
        res.status(200).json({Message : 'Success', addedTask : addedTask.rows});
    }catch(err){
        console.log(err.message);
    }
})
app.get('/task/status/:status', async (req, res) => {
    try{
        const { status } = req.params;
        const fetchedTasks = await client.query(fetchAllTasksQuery, [status]);
        // console.log(addedTask.rows);
        res.status(200).json({Message : 'Success', fetchedTasks : fetchedTasks.rows});
    }catch(err){
        console.log(err.message);
    }
})

app.delete('/task/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const deleteTasks = await client.query(deleteTasksQuery, [id]);
        // console.log(addedTask.rows);
        res.status(200).json({Message : 'Success', deleteTasks : deleteTasks.rows});
    }catch(err){
        console.log(err.message);
    }
})

app.put('/task/status/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { status } = req.body;
        const updateTask = await client.query(updateTasksQuery, [status,id]);
        console.log(updateTask);
        // console.log(addedTask.rows);
        res.status(200).json({Message : 'Success', updateTask : updateTask.rows});
    }catch(err){
        console.log(err.message);
    }
})

app.listen(PORT, () => console.log('App is listening at ' + PORT));