const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));
app.get('/', function(req, res){
    res.render('index.html');
});
app.listen(port);