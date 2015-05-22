import express from 'express';

let topicRouter = express.Router();

topicRouter.get('/topics', function (req, res) {
  res.send({topics : []});
});

topicRouter.post('/topics', function (req, res) {
  var topic = {
    id : (++topicIdCounter),
    title : req.body.title,
    description : req.body.description
  };

  res.send('got some topic:' + JSON.stringify(topic));
});

topicRouter.get('/topics/:id', function (req, res) {
  var topic = {
    id : req.params.id,
    title : 'no',
    description: 'nope'
  };

  res.send(topic);
});

topicRouter.put('/topics/:id', function (req, res) {
  var topic = {
    id : req.params.id,
    title : req.body.title,
    description : req.body.description
  };

  res.send('update some topic:' + JSON.stringify(topic));
});

topicRouter.delete('/topics/:id', function (req, res) {
  var topicId = req.params.id;

  res.send('delete some topic:' + topicId);
});

topicRouter.get('/topics/:topicId/ideas', function (req, res) {
  res.send({ideas : []});
});

topicRouter.post('/topics/:topicId/ideas', function (req, res) {
  var idea = {
    id : (++ideaIdCounter),
    title : req.body.title,
    description : req.body.description,
    votes : req.body.votes
  };

  res.send('got some idea:' + JSON.stringify(idea));
});

topicRouter.get('/topics/:topicId/ideas/:id', function (req, res) {
  var idea = {
    id : req.params.id,
    title : 'no',
    description : 'nope',
    votes : 0
  };

  res.send(idea);
});

topicRouter.put('/topics/:topicId/ideas/:id', function (req, res) {
  var idea = {
    id : req.params.id,
    title : req.body.title,
    description : req.body.description,
    votes : req.body.votes
  };

  res.send('update some idea:' + JSON.stringify(idea));
});

topicRouter.delete('/topics/:topicId/ideas/:id', function (req, res) {
  var ideaId = req.params.id;

  res.send('delete some idea:' + ideaId);
});

export default topicRouter;
