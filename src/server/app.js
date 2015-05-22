import express from 'express';
import bodyParser from 'body-parser';

let app = express();
let topicIdCounter = 0;
let ideaIdCounter = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({	extended: true }));

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

app.post('/topics/:topicId/ideas', function (req, res) {
  var idea = {
    id : (++ideaIdCounter),
    title : req.body.title,
    description : req.body.description,
    votes : req.body.votes
  };

  res.send('got some idea:' + JSON.stringify(idea));
});

app.post('/login', function (req, res) {
  var credentials = {
    username : req.body.username,
    password : req.body.password
  };

  res.send('got some login:' + JSON.stringify(credentials));
});

app.listen(8181);
