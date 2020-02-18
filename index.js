const express = require("express");
const {
  engine
} = require("express-edge");
const moment = require("moment");
const axios = require("axios");
const app = express();

app.use(engine);
app.use("/assets", express.static(__dirname + "/assets"));
app.set("views", `${__dirname}/views`);

app.get("/", async (req, res) => {
  const status = req.query.status == 'completed' ? req.query.status : 'incomplete';
  const todos = await axios.get(`http://localhost:3000/todos?status=${status}`);
  res.render("index", {
    date: moment().format("LL"),
    todos: todos.data,
    status: status
  });
});

app.listen(4000, () => console.log("Listen on Port 4000"));