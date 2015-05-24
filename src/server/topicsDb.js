import low from 'lowdb';
import underscoreDb from 'underscore-db';
import _ from 'lodash';
import config from './config';

low.mixin(underscoreDb);

export default class Database {
  constructor(dbName, options) {
    if (!dbName) {
      dbName = config.topicsDb;
    }
    this.db = low(dbName, options);
  }

  createTopic(title, description) {
    let topic = {
      title : title,
      description : description
    };

    return this.db('topics').insert(topic);
  }

  getTopic(id) {
    return this.db('topics').find({id : id});
  }

  getTopics() {
    return this.db('topics').value();
  }

  updateTopic(id, title, description) {
    let topic = {
      title : title,
      description : description
    };

    return this.db('topics')
      .chain()
      .find({id : id})
      .assign(topic)
      .value();
  }

  deleteTopic(id) {
    return this.db('topics').remove(id);
  }

  createIdea(topicId, title, description) {
    let idea = {
      topicId : topicId,
      title : title,
      description : description,
      votes : 0
    };

    idea = this.db('ideas').insert(idea);
    return idea;
  }

  getIdeas(topicId) {
    return this.db('ideas').where({topicId : topicId});
  }

  getIdea(id) {
    return this.db('ideas').find({id : id});
  }

  updateIdea(id, title, description) {
    let idea = {
      title : title,
      description : description
    };

    return this.db('ideas')
      .chain()
      .find({id : id})
      .assign(idea)
      .value();
  }

  deleteIdea(id) {
    return this.db('ideas').remove(id);
  }

  voteIdea(id) {
    return this.db('ideas')
      .chain()
      .where({id : id})
      .map((i) => {
        i.votes = i.votes + 1;
        return i;
      })
      .value();
  }
}
