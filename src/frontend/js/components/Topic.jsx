import React from 'react/addons';

export default class Topic extends React.Component {

  constructor() {
    super();
    this.state = {
      title : '',
      description : ''
    };
  }

  render() {
    return (
      <div className="topic">
        <h2 className="title">{this.props.title}</h2>

        <p className="description">
          {this.props.description}
        </p>
      </div>
    );
  }
}
