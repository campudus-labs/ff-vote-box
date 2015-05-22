import low from 'lowdb';
import underscoreDb from 'underscore-db';

low.mixin(underscoreDb);

let db = low('db.json');

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
  let x = db('topics').find({id: id});
  let r = db('topics').remove(x);

  return r;
}

export default {
  getTopics : getAllTopics,
  getTopic : getTopic,
  updateTopic : updateTopic,
  createTopic : createTopic,
  deleteTopic : deleteTopic
}
