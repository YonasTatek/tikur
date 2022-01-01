const express     = require('express');
const ejs         = require('ejs');
const bodyParser  = require('body-parser');
const routs       = require('./routs/index');
const mongoose    = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/todo-app-db', {useMongoClient: true}, (err) => {
  if(err) {
    console.log('Not connected to database !!! -> ' + err);
  } else {
    console.log('Connected to database successfully ...')
  }
});

let urlencodedParser = bodyParser.urlencoded({ extended: false });


app.set('view engine', 'ejs');


app.get('/', routs.home);
app.post('/tasks', urlencodedParser, routs.sendData);
app.delete('/delete/:id', routs.deleteData);


app.use(express.static(__dirname + '/public/'));


app.use(routs.notFound);


app.listen(port, () => {
  console.log("APP is listening on port " + port);
});
