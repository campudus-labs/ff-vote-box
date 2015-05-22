import express from 'express';

let app = express();

app.get('/votes', function (req, res) {
  res.send({votes : []});
});

app.get('/hello', function (req, res) {
  let hellos = ['hi', 'hello', 'good day', 'welcome'];
  res.send(hellos[Math.floor(Math.random() * hellos.length)]);
});

app.listen(8181);
