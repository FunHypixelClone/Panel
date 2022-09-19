const express = require('express');
const app = express();
const conf = require('../conf');

app.listen(3000, () => {
    console.log('Web - Online');
});