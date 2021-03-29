const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, 'upload')));


app.use('*', async (req, res) => {
   const indexPath = path.resolve(__dirname, '../build', 'index.html');
    const isReadble = fs.access(indexPath, fs.constants.R_OK)
    console.log(isReadble);
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
