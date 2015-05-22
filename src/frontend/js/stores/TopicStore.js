import BaseStore from './BaseStore';
import {TOPICS_CHANGE, TOPICS_ADD} from '../constants/TopicConstants.js';

class TopicStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._topics = [];
  }

  _registerToActions(action) {
    switch (action.actionType) {
      case TOPICS_CHANGE:
        this._topics = action.topics;
        this.emitChange();
        break;
      case TOPICS_ADD:
        this._topics.push(action.topic);
        this.emitChange();
        break;
      default:
        break;
    }
  }

  get topics() {
    return this._topics;
  }

}

export default new TopicStore();