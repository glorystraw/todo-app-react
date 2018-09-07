import React, { Component } from 'react';
import _ from 'lodash';
import TodosList from './components/todos-list';
import CreateTodo from  './components/create-todo';
//import SimpleStorage from 'react-simple-storage';
import './App.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class App extends Component {

constructor(props) {

  super(props);

  this.state = {
    todos : []
  };
}

// Get our existing todos from local storage
componentDidMount() {
  localStorage.getItem('todos') && this.setState({
    todos : JSON.parse(localStorage.getItem('todos')),
  })
}

//Render Todolist
  render() {
  return (
<div className="App">
    {/*<SimpleStorage parent={this}/>*/}
    <h1>Glorystraw Todo List</h1>
    <h3>Add Task With Descrtiption</h3>
    <CreateTodo
      todos={this.state.todos.sort((a,b) => b.TaskTitle > a.TaskTitle ? 1 :  -1)}
      createTask={this.createTask.bind(this)}
      />
    <TodosList
      todos={this.state.todos}
      toggleTask={this.toggleTask.bind(this)}
      saveTask={this.saveTask.bind(this)}
      deleteTask={this.deleteTask.bind(this)}
      />
  </div>);
}

  //Create new task function
  createTask(TaskTitle, TaskItem){
    this.state.todos.push({
      TaskTitle,
      TaskItem,
      isCompleted : false
    });
    this.setState({todos: this.state.todos});

  }
// Toggle task
  toggleTask(TaskTitle, TaskItem){
    const foundTodo = _.find(this.state.todos, todo => todo.TaskTitle === TaskTitle );
    foundTodo.isCompleted = !foundTodo.isCompleted;
    this.setState({todos: this.state.todos});
  }

//Save edited task
  saveTask(oldTaskTitle, newTaskTitle, oldTaskItem, newTaskItem) {
    const foundTodo = _.find(this.state.todos, todo => todo.TaskTitle === oldTaskTitle, todo => todo.TaskItem === oldTaskItem);
    foundTodo.TaskTitle = newTaskTitle;
    foundTodo.TaskItem = newTaskItem;
    this.setState({todos: this.state.todos});
  }

// Delete Task from list
  deleteTask(taskToDelete) {
    _.remove(this.state.todos, todo => todo.TaskTitle === taskToDelete);
    this.setState({todos:this.state.todos});
  }

//Set our existing todos to localStorage
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('todos', JSON.stringify(nextState.todos));
  }

}

export default App;
