const mongoose = require('mongoose');
const db = "mongodb://127.0.0.1:27017/deep-thoughts";

mongoose.connect(process.env.MONGODB_URI || db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then( () => {
  console.log("Connected To Mongo Db DataBase");
}).catch((err) => {
console.log("DataBase Connection Error " + err);
});

module.exports = mongoose.connection;
