require("dotenv").config();
const express = require("express");
const db = require("./database/conn");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());