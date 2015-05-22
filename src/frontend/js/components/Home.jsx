import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent.jsx'
import Topics from './Topics.jsx';
import TopicsService from '../services/TopicService.js';
import TopicStore from '../stores/TopicStore.js';

export default AuthenticatedComponent(class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      topics : []
    };
  }

  componentWillMount() {
    this.changeListener = this._onChange.bind(this);
    TopicStore.addChangeListener(this.changeListener);
    TopicsService.getTopics();
  }

  _getTopicsState() {
    return {
      topics : TopicStore.topics
    };
  }

  _onChange() {
    this.setState(this._getTopicsState());
  }

  render() {
    return (
      <Topics topics={this.state.topics}/>
    );
  }
});