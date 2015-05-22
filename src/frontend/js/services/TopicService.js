import request from 'reqwest';
import when from 'when';
import {TOPICS_URL} from '../constants/TopicConstants.js';
import TopicActions from '../actions/TopicActions';

class TopicService {

  getTopics() {
    /*this.handleTopicsResult(when(request({
     url : TOPICS_URL,
     method : 'GET',
     crossOrigin : true
     })));*/

    this.handleTopicsResult(when({
      topics : [
        {
          id : 1,
          title : "topic 1",
          description : "description of topic 1"
        },
        {
          id : 2,
          title : "topic 2",
          description : "description of topic 2"
        }, {
          id : 3,
          title : "topic 3",
          description : "description of topic 3"
        }]
    }));
  }

  add(title, description) {
    /*this.handleTopicAddResult(when(request({
     url : TOPICS_URL,
     method : 'POST'
     crossOrigin : true,
     type : 'json',
     data : {
     title, description
     }
     })));*/

    this.handleTopicAddResult(when({
      id : 4,
      title : title,
      description : description
    }));
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