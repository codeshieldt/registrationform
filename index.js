const express = require('express');
const app = express();
const user = require('./routes/users');

const port = process.env.PORT || 3000;

require('./db/db')();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.use('/', user);

app.listen(port, () => {console.log(`Listening on port ${port}`)});