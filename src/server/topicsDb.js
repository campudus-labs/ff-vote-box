import config from './config';
import low from 'lowdb';
import underscoreDb from 'underscore-db';
import _ from 'lodash';

low.mixin(underscoreDb);

let db = low(config.topicsDb);

function getAllTopics() {
  return db('topics').value();
}

function getTopic(id) {
  return db('topics').find({id : id});
}

function createTopic(title, description) {
  let topic = {
    title : title,
    description : description
  };

  return db('topics').insert(topic);
}

function updateTopic(id, title, description) {
  let topic = {
    title : title,
    description : description
  };

  return db('topics')
    .chain()
    .find({id : id})
    .assign(topic)
    .value();
}

function deleteTopic(id) {
  return db('topics').remove(id);
}

export default {
  getTopics : getAllTopics,
  getTopic : getTopic,
  updateTopic : updateTopic,
  createTopic : createTopic,
  deleteTopic : deleteTopic
}
