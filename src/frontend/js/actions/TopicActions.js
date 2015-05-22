import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {TOPICS_CHANGE} from '../constants/TopicConstants.js';

export default {
  getTopics: (topics) => {
    AppDispatcher.dispatch({
      actionType: TOPICS_CHANGE,
      topics: topics
    });
  }
}