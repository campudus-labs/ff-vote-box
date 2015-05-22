import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {TOPICS_CHANGE, TOPICS_ADD} from '../constants/TopicConstants.js';

export default {
  getTopics : (topics) => {
    AppDispatcher.dispatch({
      actionType : TOPICS_CHANGE,
      topics : topics
    });
  },

  addTopic : (topic) => {
    AppDispatcher.dispatch({
      actionType : TOPICS_ADD,
      topic : topic
    });
  }
}