import React from 'react';


class TodosListItem extends React.Component {
constructor(props){
  super(props);
  this.state = {
    isEditing: false
  };
}

renderTaskSection(){
  const {TaskTitle, TaskItem, isCompleted} = this.props;
  const TaskStyle = {
    color: isCompleted ? 'red' : '',
    cursor: 'pointer',
    textDecoration: isCompleted ? 'line-through' : 'none'
  }
  if (this.state.isEditing){
    return (
      <td>
        <form onSubmit={this.onSaveClick.bind(this)}>
          <input className="forminput" type="text" defaultValue={TaskTitle} ref="editTitleInput" />
          <input className="forminput" type="text" defaultValue={TaskItem} ref="editItemInput" />

        </form>
      </td>
    );
  }

  return (

<td style={TaskStyle} onClick={this.props.toggleTask.bind(this, TaskTitle, TaskItem)}>
    <span className="tasktitle">{TaskTitle}</span>
    <span className="taskitem">{TaskItem}</span>
</td>
  );
}
// Buttons in Actions section Edit, Save, Cancel, Delete
renderActionsSection() {
  if (this.state.isEditing) {
    return (
      <td>
      <button onClick={this.onSaveClick.bind(this)}>Save</button>
      <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
      </td>
    );
  }
  return (
    <td>
    <button onClick={this.onEditClick.bind(this)}>Edit</button>
    <button onClick={this.props.deleteTask.bind(this, this.props.TaskTitle)}>Delete</button>
    </td>
  );
}

render() {
  return (

<tr>
    {this.renderTaskSection()}
    {this.renderActionsSection()}
  </tr>

);
}
onEditClick(){
  this.setState({isEditing: true});
}

onCancelClick(){
  this.setState({isEditing: false});
}

onSaveClick(e){
  e.preventDefault();
  const oldTaskTitle = this.props.TaskTitle;
  const newTaskTitle = this.refs.editTitleInput.value;
  const oldTaskItem = this.props.TaskItem;
  const newTaskItem = this.refs.editItemInput.value;
  this.props.saveTask(oldTaskTitle, newTaskTitle, oldTaskItem, newTaskItem );
  this.setState({isEditing: false});
}
}


export default TodosListItem;
