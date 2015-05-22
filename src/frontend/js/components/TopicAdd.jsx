import React from 'react/addons';
import ReactMixin from 'react-mixin';
import TopicService from '../services/TopicService.js'

export default class TopicAdd extends React.Component {

  constructor() {
    super();
    this.state = {
      buttonTitle : 'New Topic',
      isAdding : false
    };
  }

  add(e) {
    e.preventDefault();
    console.log("add topic");
    this.setState({
      isAdding : true,
      buttonTitle : 'Save'
    });

    TopicService.add(this.state.title, this.state.description);
  }

  cancel(e) {
    e.preventDefault();
    console.log("cancel topic");
    this.setState({
      buttonTitle : 'New Topic',
      isAdding : false,
      title : '',
      description : ''
    });
  }

  render() {
    return (
      <div className="topic">
        <button className="add-button" onClick={this.add.bind(this)}>{this.state.buttonTitle}</button>
        <button className={this.state.isAdding?'':'hide'} onClick={this.cancel.bind(this)}>Cancel</button>
        <div className={this.state.isAdding?'':'hide'}>
          <label htmlFor="title">Title</label>
          <input type="text" valueLink={this.linkState('title')} className="form-control" id="title"
                 placeholder="Title"/>
        </div>
        <div className={this.state.isAdding?'':'hide'}>
          <label htmlFor="description">Description</label>
          <textarea name="description" valueLink={this.linkState('description')} className=""/>
        </div>
      </div>
    );
  }
}

reactMixin(TopicAdd.prototype, React.addons.LinkedStateMixin);