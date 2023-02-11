const mongoose = require('mongoose');
const config = require('../config');

// Mongo Atlas Configuration
const connectAtlas = () => {
  mongoose
    .connect(config.db.uri)
    .then(() => {
      console.log('Connected to Mongo Atlas');
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = connectAtlas;

// Mongo Server configuration
// async function main() {
//   const URL = config.db.uri;
//   mongoose
//     .connect(URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log('mongodb is connected');
//     })
//     .catch((error) => {
//       console.log('mondb not connected B)');
//       console.log(error);
//     });

//   // use `await mongoose.connect('mongodb://supercarloss:superayala@localhost:27017/testing');` if your database has auth enabled
// }
// main();
