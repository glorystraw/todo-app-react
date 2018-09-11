import React from 'react';
import _ from 'lodash';

class CreateTodo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  // Render Error message when the same input or empty task
  renderError () {
    if (!this.state.error) {
      return null;
    }

    return <div style = { { color: 'red' } }>{this.state.error}</div>;
  }

  // Render create todo form where we can add tasktitle and taskitem to create our todo
  render() {
    return (
  <form onSubmit ={this.handleCreate.bind(this)}>
    <input className="forminput" type="text"
      placeholder="Add Task Title" ref="createTitleInput" />
    <input className="forminput" type="text"
      placeholder="Add Task Description" ref="createItemInput" />
    <button id="add">Add Task</button>
    {this.renderError()}
  </form>
  );
  }

  //  Getting values of tasktitle and taskitem from input for creating new elements
  handleCreate(e) {
    e.preventDefault();
    const createTitleInput = this.refs.createTitleInput;
    const createItemInput = this.refs.createItemInput;
    const TaskTitle = createTitleInput.value;
    const TaskItem = createItemInput.value;
    const validateInput = this.validateInput(TaskTitle, TaskItem);

    if (validateInput) {
      this.setState({ error: validateInput });
      return;
    }

    this.setState({ error: null });

    this.props.createTask(this.refs.createTitleInput.value, this.refs.createItemInput.value);
    this.refs.createTitleInput.value = '';
    this.refs.createItemInput.value = '';
  }

  // Validation method
  validateInput(TaskTitle, TaskItem) {
    if (!TaskTitle || !TaskItem) {
      return 'Please enter Task fields.';
    }  else if (_.find(this.props.todos, todo => todo.TaskTitle === TaskTitle)
  &&
  _.find(this.props.todos, todo => todo.TaskItem === TaskItem))
  {
      return 'This Task already exists.';
    } else {
      return null;
    }
  }
}

export default CreateTodo;
