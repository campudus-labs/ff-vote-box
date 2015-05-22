import express from 'express';

import Calculator from './Calculator';

let app = express();
let calc = new Calculator();

app.get('/votes', function (req, res) {
  res.send({votes : []});
});

app.get('/hello', function (req, res) {
  let hellos = ['hey', 'hi', 'hello', 'good day', 'welcome'];
  throw new Error('ups');
  res.send(hellos[Math.floor(Math.random() * hellos.length)]);
});

app.get('/calc/add/:x', function (req, res) {
  let x = req.params.x;
  res.send('current:' + calc.add(x));
});

app.listen(8181);
