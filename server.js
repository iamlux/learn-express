const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
var db;


MongoClient.connect('mongodb://luxexpress:12345@ds117859.mlab.com:17859/luxexpress',(err, database) => {
  if(err) return console.log(err);
  db = database;
  app.listen(3000, ()=>{
    console.log('Listening on 3000');
  })
});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    db.collection('quotes').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('index.ejs', {quotes: results});
  });
});

app.post('/quotes', (req,res) => {
    db.collection('quotes').save(req.body, (err,result) => {
      if(err) return console.log(err);

      console.log("Saved to database");

      res.redirect('/');
    })
});
