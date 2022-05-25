require("dotenv").config();
const express = require("express");
const db = require("./database/conn");
const app = express();

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
app.patch('/api/accounts/:id', async (req, res) => {
    try {
        const { task } = req.body;
        const currentTask = await pool.query('SELECT * FROM todos WHERE id = $1', [req.params.id]);
        const taskObj = {
            task: task || currentTask.rows[0].task,
        }

        const updatedTask = await pool.query('UPDATE todos SET task = $1 WHERE account_id = $2 RETURNING *', [taskObj.task, req.params.id]);
        res.send(updatedTask.rows[0]);
    } catch (error) {
        res.send(error.message);
    }
})

//post
app.post('/api/accounts', async (req, res) => {
    try {
        const objKeys = Object.keys(req.body);
        if (objKeys.length !== 1) {
            res.send("Ensure you enter a task");
        } else {
            const createdAcc = await pool.query(`INSERT INTO todos (task) VALUES ($1) RETURNING *`, [req.body.task]);
            res.json(createdAcc.rows);
        }
    } catch (error) {
        res.send(error.message);
    }
});

//delete
app.delete('/api/todo/:id', async (req, res) => {
    try {
        const deletedAcc = await pool.query('SELECT * FROM todos WHERE id = $1', [req.params.id]);
        const deleted = await pool.query('DELETE FROM todos WHERE id = $1', [req.params.id]);
        res.json(deletedAcc.rows);
    } catch (error) {
        res.send(error.message);
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`);
})