import express from 'express';
import config from './config';
import Database from './topicsDb';
import {loggedIn} from './helpers';

let topicRouter = express.Router();
topicRouter.use(loggedIn);
let db = new Database();

topicRouter.get('/topics', function (req, res) {
  res.send({topics : db.getTopics()});
});

topicRouter.post('/topics', function (req, res) {
  let topic = db.createTopic(req.body.title, req.body.description);

  res.send(topic);
});

topicRouter.get('/topics/:id', function (req, res) {
  var topic = db.getTopic(req.params.id);

  res.send(topic);
});

topicRouter.put('/topics/:id', function (req, res) {
  let topic = db.updateTopic(req.params.id, req.body.title, req.body.description);

  res.send(topic);
});

topicRouter.delete('/topics/:id', function (req, res) {
  let topic = db.deleteTopic(req.params.id);

  res.send(topic);
});

topicRouter.get('/topics/:topicId/ideas', function (req, res) {
  let ideas = db.getIdeas(req.params.topicId);

  res.send({ideas : ideas});
});

topicRouter.post('/topics/:topicId/ideas', function (req, res) {
  let idea = db.createIdea(req.params.topicId, req.body.title, req.body.description);

  res.send('got some idea:' + JSON.stringify(idea));
});

topicRouter.get('/topics/:topicId/ideas/:id', function (req, res) {
  var idea = db.getIdea(req.params.id);

  res.send(idea);
});

topicRouter.put('/topics/:topicId/ideas/:id', function (req, res) {
  let updated = db.updateIdea(req.params.id, req.body.title, req.body.description);

  res.send(updated);
});

topicRouter.post('/topics/:topicId/ideas/:id/votes', function (req, res) {
  let idea = db.voteIdea(req.params.id);

  res.send(idea);
});

topicRouter.delete('/topics/:topicId/ideas/:id', function (req, res) {
  let idea = db.deleteIdea(req.params.id);

  res.send(idea);
});

export default topicRouter;
