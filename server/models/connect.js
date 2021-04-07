const mongoose = require('mongoose');
const {DB_HOST_URL} = process.env;
console.log(DB_HOST_URL)
const url = `${DB_HOST_URL}`;

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(url, {
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => console.log('Mongoose connected'));
mongoose.connection.on('error', (err) => console.log(`Mongoose connection error: ${err}`));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));
