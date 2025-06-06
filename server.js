const express = require("express");
const bodyParser = require("body-parser");

// creates our express app
const app = express();

// we parse body data to json -> app end point works after
app.use(bodyParser.json());

const db = {
  users: [
    {
      id: "123",
      name: "john",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

// root route GET
// when we return users now that we've created a register route, it only shows what's in our database variable
// it's only going to show john and sally since we hardcoded it,
// if we register again and get again, it will show the newly added user
// when we refresh the app code, since we don't have a database, it resets to the hard coded values
// doesn't persist because variables get re-run
// databases: they persist/save the data/sessions
app.get("/", (req, res) => {
  res.send(db.users);
});

// sign-in route POST(bc hides password/login info)
app.post("/sign-in", (req, res) => {
  if (
    req.body.email === db.users[0].email &&
    req.body.password === db.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("credentials did not match");
  }
});

// register route POST -> return newly created user
// we are adding an object with dynmaic data from our register form from postman
app.post("/register", (req, res) => {
  // we get the data off the body of the response from postman
  const { email, name, password } = req.body;
  // in postman, we add values into name, email and password
  // and in our database we push entries, joined, and id
  // and finally in postman when we press send again, it shows all data combinedp
  db.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  //   how we return json of the last user added to the database
  res.json(db.users[db.users.length - 1]);
});

// get Profile
app.get("/profile/:id", (req, res) => {
  //   grab id
  const { id } = req.params;
  let found = false;
  //   loop through database
  db.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("not found");
  }
});

app.put("/image", (req, res) => {
  //   grab id
  const { id } = req.body;
  let found = false;
  //   loop through database
  db.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("not found");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
