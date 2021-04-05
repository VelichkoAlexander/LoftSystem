const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/index')

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, 'upload')));

app.use('/', routes);

app.use('*', (req, res) => {
  const indexPath = path.resolve(__dirname, '../build', 'index.html');
  fs.access(indexPath, fs.constants.F_OK | fs.constants.R_OK, (err) => {

    if (err) {
      return res.status(404).send('Index Not Found');
    }

    return res.sendFile(indexPath);

  });
});

app.use((err, req, res) => {
  console.log(err);
  res.status(500).json({
    code: 500,
    message: err.message,
  })
})




module.exports = app;