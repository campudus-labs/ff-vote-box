import request from 'reqwest';
import when from 'when';
import {TOPICS_URL} from '../constants/TopicConstants.js';
import TopicActions from '../actions/TopicActions';

class TopicService {

  getTopics() {
    /*handleTopicsResult(when(request({
     url : TOPICS_URL,
     method : 'GET',
     crossOrigin : true
     })));*/

    this.handleTopicsResult(when({
      topics : [
        {
          title : "topic 1",
          description : "description of topic 1"
        },
        {
          title : "topic 2",
          description : "description of topic 2"
        }, {
          title : "topic 3",
          description : "description of topic 3"
        }]
    }));
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