import React from 'react/addons';
import Topic from './Topic.jsx';

export default class Topics extends React.Component {

  constructor() {
    super();
  }

  render() {
    let topicNodes = this.props.topics.map(function (topic) {
      return (
        <Topic title={topic.title} description={topic.description}/>
      );
    });

    return (
      <div className="topics">
        <h1>Topics</h1>

        <div className="topics-list">
          {topicNodes}
        </div>
      </div>
    );
  }
}