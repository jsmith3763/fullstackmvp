require("dotenv").config();
const express = require("express");
const db = require("./database/conn");
const app = express();
const { response } = require("express");
const { json } = require("body-parser");


const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

//getall
app.get("/api/todo", async (req, res) => {
    try {
        await db.connect();
        const result = await db.query("SELECT * FROM todos");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.send("Error: ", error);
    }
});

//getone
app.get("/api/todo/:id", async (req, res) => {
    try {
        await db.connect();
        const result = await db.query("SELECT * FROM todos WHERE id = $1", [req.params.id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.send("Error: ", error);
    }
});

//update
app.patch('/api/todo/:id', async (req, res) => {
    try {
        const { task } = req.body;
        const currentTask = await db.query('SELECT * FROM todos WHERE id = $1', [req.params.id]);
        //console.log(req.params.id)
        const taskObj = {
            task: task || currentTask.rows[0].task
        }

        const updatedTask = await db.query('UPDATE todos SET task = $1 WHERE id = $2 RETURNING *', [taskObj.task, req.params.id]);
        res.send(updatedTask.rows[0]);
    } catch (error) {
        res.send(error.message);
    }
})

//post
app.post('/api/todo', async (req, res) => {
    try {
        const { task } = req.body;
        const { rows } = await db.query('INSERT INTO todos (task) VALUES($1) RETURNING *', [task]);
        res.send({ data: (rows), message: "New task has been created" });
        console.log({ rows });
        console.log('Task was created');
    } catch (error) {
        console.error(error);
    }
});

//delete
app.delete('/api/todo/:id', async (req, res) => {
    try {
        const deletedTask = await db.query('SELECT * FROM todos WHERE id = $1', [req.params.id]);
        const deleted = await db.query('DELETE FROM todos WHERE id = $1', [req.params.id]);
        res.json(deletedTask.rows);
    } catch (error) {
        console.error(error);
    }
})


//getall for completed table
app.get("/api/completed", async (req, res) => {
    try {
        await db.connect();
        const result = await db.query("SELECT * FROM completed");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.send("Error: ", error);
    }
});

//getone for completedtable
app.get("/api/completed/:id", async (req, res) => {
    try {
        await db.connect();
        const result = await db.query("SELECT * FROM completed WHERE id = $1", [req.params.id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.send("Error: ", error);
    }
});

//update for completed table
app.patch('/api/completed/:id', async (req, res) => {
    try {
        const { task } = req.body;
        const currentTask = await db.query('SELECT * FROM completed WHERE id = $1', [req.params.id]);
        const taskObj = {
            task: task || currentTask.rows[0].task
        }
        const updatedTask = await db.query('UPDATE completed SET task = $1 WHERE id = $2 RETURNING *', [taskObj.task, req.params.id]);
        res.send(updatedTask.rows[0]);
    } catch (error) {
        res.send(error.message);
    }
})

//post for completed table
app.post('/api/completed', async (req, res) => {
    try {
        const { task } = req.body;
        const { rows } = await db.query('INSERT INTO completed (task) VALUES($1) RETURNING *', [task]);
        res.send({ data: (rows), message: "New task has been created" });
        console.log({ rows });
    } catch (error) {
        console.error(error);
    }
});

//delete for completed table
app.delete('/api/completed/:id', async (req, res) => {
    try {
        const deletedTask = await db.query('SELECT * FROM completed WHERE id = $1', [req.params.id]);
        const deleted = await db.query('DELETE FROM completed WHERE id = $1', [req.params.id]);
        res.json(deletedTask.rows);
    } catch (error) {
        console.error(error);
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`);
})