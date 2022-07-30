const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const db = require("./models");

const { User } = require("./models");

app.get("/get-users", (req, res) => {
  User.findAll()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/add-user", (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    address: req.body.address,
    bio: req.body.bio,
  }).then((user) => {
    res.status(200).json(user);
  });
});

db.sequelize.sync().then((req) => {
  app.listen(3001, () => {
    console.log("Server Running");
  });
});
