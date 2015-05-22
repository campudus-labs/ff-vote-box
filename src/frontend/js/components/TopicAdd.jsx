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
      <div className="topic-add clearfix">
        <div className="actions">
          <button className="add-button" onClick={this.add.bind(this)}>{this.state.buttonTitle}</button>
          <button className={this.state.isAdding?'':'hide'} onClick={this.cancel.bind(this)}>Cancel</button>
        </div>
        <div className="inputs">
          <div className={this.state.isAdding?'input-group':'hide'}>
            <input type="text" valueLink={this.linkState('title')} required/>
              <span className="bar"></span>
              <label htmlFor="title">Title</label>
            </div>

          <div className={this.state.isAdding?'':'hide'}>
            <label htmlFor="description">Description</label>
            <textarea name="description" valueLink={this.linkState('description')} className=""/>
          </div>
        </div>
      </div>
    );
  }
}

reactMixin(TopicAdd.prototype, React.addons.LinkedStateMixin);