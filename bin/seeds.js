require('dotenv').config();

const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");

mongoose.connect(process.env.DBURL).then(() => {
  console.log("Conectado!");
  Celebrity.collection.drop();
});

const celebrities = [
  {
    name: "Justin Timberlake",
    occupation: "singer",
    catchPhrase: "I don't feel guilty about success. You can't feel guilty about aspiring to be good at something."
  },
  {
    name: "Will Smith",
    occupation: "actor",
    catchPhrase: "If I weren't a musician/actor, I'd be a computer engineer. I was always good at math. I probably would have been the guy who invented the remote control if I'd been around then."
  },
  {
    name: "Cristiano Ronaldo",
    occupation: "footballer",
    catchPhrase: "Some fans keep booing and whistling at me because I'm handsome, rich and a great player. They envy me."
  }
];

Celebrity.create(celebrities)
  .then ((celebrities) => {
    console.log(celebrities);
    mongoose.connection.close();
  })
  .catch ((err) => {
    console.log(err);
  })
