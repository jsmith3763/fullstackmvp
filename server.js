require("dotenv").config();
const express = require("express");
const db = require("./database/conn");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());


app.listen(process.env.port, () => {
    console.log(`Listening on Port ${process.env.PORT}`);
})