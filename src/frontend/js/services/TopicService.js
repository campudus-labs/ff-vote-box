import request from 'reqwest';
import when from 'when';
import {TOPICS_URL} from '../constants/TopicConstants.js';
import TopicActions from '../actions/TopicActions';

class TopicService {

  getTopics() {
    this.handleTopicsResult(when(request({
      url : TOPICS_URL,
      method : 'GET',
      crossOrigin : true
    })));
  }

  add(title, description) {
    this.handleTopicAddResult(when(request({
      url : TOPICS_URL,
      method : 'POST',
      crossOrigin : true,
      type : 'json',
      data : {
        title, description
      }
    })));
  }

  handleTopicAddResult(addTopicPromise) {
    return addTopicPromise
      .then(function (response) {
        TopicActions.addTopic(response);
      });
  }

  handleTopicsResult(topicsPromise) {
    return topicsPromise
      .then(function (response) {
        let topics = response.topics;
        TopicActions.getTopics(topics);
      });
  }

}

export default new TopicService()