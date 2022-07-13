const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>HELLO WORLD</h1>')
})

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});