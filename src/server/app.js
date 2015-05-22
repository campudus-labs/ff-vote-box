import express from 'express';
import bodyParser from 'body-parser';

let app = express();
let topicIdCounter = 0;
let ideaIdCounter = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/topics', function (req, res) {
  res.send({topics : []});
});

app.post('/topics', function (req, res) {
  var topic = {
    id : (++topicIdCounter),
    title : req.body.title,
    description : req.body.description
  };

  res.send('got some topic:' + JSON.stringify(topic));
});

app.get('/topics/:id', function (req, res) {
  var topic = {
    id : req.params.id,
    title : 'no',
    description: 'nope'
  };

  res.send(topic);
});

app.put('/topics/:id', function (req, res) {
  var topic = {
    id : req.params.id,
    title : req.body.title,
    description : req.body.description
  };

  res.send('update some topic:' + JSON.stringify(topic));
});

app.delete('/topics/:id', function (req, res) {
  var topicId = req.params.id;

  res.send('delete some topic:' + topicId);
});

app.get('/topics/:topicId/ideas', function (req, res) {
  res.send({ideas : []});
});

app.post('/topics/:topicId/ideas', function (req, res) {
  var idea = {
    id : (++ideaIdCounter),
    title : req.body.title,
    description : req.body.description,
    votes : req.body.votes
  };

  res.send('got some idea:' + JSON.stringify(idea));
});

app.get('/topics/:topicId/ideas/:id', function (req, res) {
  var idea = {
    id : req.params.id,
    title : 'no',
    description : 'nope',
    votes : 0
  };

  res.send(idea);
});

app.put('/topics/:topicId/ideas/:id', function (req, res) {
  var idea = {
    id : req.params.id,
    title : req.body.title,
    description : req.body.description,
    votes : req.body.votes
  };

  res.send('update some idea:' + JSON.stringify(idea));
});

app.delete('/topics/:topicId/ideas/:id', function (req, res) {
  var ideaId = req.params.id;

  res.send('delete some idea:' + ideaId);
});

app.listen(8181);
