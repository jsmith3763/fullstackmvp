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

//post

//delete

app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`);
})