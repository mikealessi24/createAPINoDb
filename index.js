// This is the entry point to the server logic

let { recievers, setId } = require("./fakeDb");
// console.log(recievers);  access's the object (fake database)
const express = require("express");
const { filter, map } = require("ramda");
const { request, response } = require("express");
const app = express();

// built in express method that encodes a browser for search query
// allows you to use request.query
app.use(express.urlencoded({ extended: true }));

// used for creating post request in the form of a JSON
app.use(express.json());

// must establish a port location
const PORT = 4000;

// first argument to a get call is the URL, next is a callback function that takes a request(-from client/postman)
// and a response that gets returned
// it is best practice to use try catch blocks, just in case there is an error
app.get("/recievers", (request, response) => {
  try {
    // console.log("success");
    response.status(200).send(recievers);
  } catch (error) {
    // console.log("failure");
  }
});

// get a single reciever using a ?id=(id number whatever you want, this is the argument)
app.get("/reciever", (request, response) => {
  try {
    const filterer = (reciever) => reciever.id == request.query.id;
    response.status(200).send(filter(filterer, recievers));
  } catch (error) {
    response.status(500).send(error);
  }
});

// same url can get differetn verbs
// here is a a route used to create a reciever
app.post("/reciever", (request, response) => {
  try {
    console.log(request.body);
    // recieve a request from postman for firstname, lastname, jerseyNum, team
    // .push new values for these to the recievers array
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const jerseyNum = request.body.jerseyNum;
    const team = request.body.team;
    recievers.push({ id: setId(), firstname, lastname, jerseyNum, team });
    response.status(201).send(recievers);
  } catch (error) {
    response.status(500).send(error);
  }
});

//here is a route used to update a reciever using a put
// this one is confusing
app.put("/reciever", (request, response) => {
  try {
    const id = request.query.id;
    console.log(id);
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const jerseyNum = request.body.jerseyNum;
    const team = request.body.team;
    const filterer = (reciever) => reciever.id == id;

    let tempReciever = {};
    // console.log(tempReciever);
    tempReciever.firstname = firstname;
    tempReciever.lastname = lastname;
    tempReciever.jerseyNum = jerseyNum;
    tempReciever.team = team;
    // console.log(tempReciever);
    // console.log(recievers);

    recievers = map(
      (reciever) => (reciever.id == id ? tempReciever : reciever),
      recievers
    );
    response.status(200).send(recievers);
  } catch (error) {
    response.status(500).send(error);
  }
});

//here is a route that will return every element that is not equal
// to a query selected id  Deleting the selected element
app.delete("/reciever", (request, response) => {
  try {
    const id = request.query.id;
    const filterer = (reciever) => reciever.id != id;
    recievers = filter(filterer, recievers);
    response.status(200).send(recievers);
  } catch (error) {
    response.status(500).send(error);
  }
});

// here is a route that returns recievers given a jersey number
app.get("/jersey_number", (request, response) => {
  try {
    const filterer = (reciever) =>
      reciever.jerseyNum == request.query.jerseyNum;

    response.status(200).send(filter(filterer, recievers));
  } catch (error) {
    response.status(500).send(error);
  }
});

// here is a route that returns recievers given a team
// this is case sensitive, also tried using .toLowerCase(), did not work
app.get("/team", (request, response) => {
  try {
    const filterer = (reciever) => reciever.team == request.query.team;
    const teamFilter = filter(filterer, recievers);
    response.status(200).send(teamFilter);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(4000, () => console.log(`App is running on port ${PORT}`));
