# Sample Node JS CRUD Application

## Setup
- Create Database ```crud_nodejs_db``` from PostgreSQL
- For the ```client``` directory

```js
npm start
```
- For the ```server``` directory

```js
nodemon index.js
```

## API
```js
//Retrieve Data
app.get("/get-users", (req, res) => {
  User.findAll()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Create Data
app.post("/add-user", (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    address: req.body.address,
    bio: req.body.bio,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update Data
app.put("/update-user", (req, res) => {
  const id = req.body.id;
  User.findByPk(id).then((proj) => {
    if (proj) {
      proj
        .update({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: req.body.age,
          address: req.body.address,
          bio: req.body.bio,
        })
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Error");
    }
  });
});

//Delete Data
app.delete("/delete-user/:id", (req, res) => {
  const id = req.params.id;
  User.findByPk(id).then((proj) => {
    if (proj) {
      proj
        .destroy({
          where: {
            id: id,
          },
        })
        .then((user) => {
          res.status(200).json(user);
        });
    } else {
      console.log("Error");
    }
  });
});
```
## Development
[CRUD Application using Node JS](https://youtube.com/playlist?list=PLNKj2WQC8KzKlW7myP_QNiqOeutaZuLUD)
