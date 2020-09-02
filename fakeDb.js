let recievers = [
  {
    id: 1,
    firstname: "Julio",
    lastname: "Jones",
    jerseyNum: "11",
    team: "Falcons",
  },
  {
    id: 2,
    firstname: "Odell",
    lastname: "Beckham Jr.",
    jerseyNum: "13",
    team: "Browns",
  },
  {
    id: 3,
    firstname: "DeAndre",
    lastname: "Hopkins",
    jerseyNum: "10",
    team: "Cardinals",
  },
  {
    id: 4,
    firstname: "Tyreek",
    lastname: "Hill",
    jerseyNum: "10",
    team: "Chiefs",
  },
  {
    id: 5,
    firstname: "Michael",
    lastname: "Thomas",
    jerseyNum: "13",
    team: "Saints",
  },
];

function setId() {
  const previousHighestId = recievers[recievers.length - 1].id;
  return previousHighestId + 1;
}
// to export more than one thing export it as an object
module.exports = { recievers, setId };

// console.log(setId());
