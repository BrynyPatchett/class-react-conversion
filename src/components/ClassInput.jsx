/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import ClassCount from './ClassCount';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{todo:'Just some demo tasks', isEdit:false}, {todo:'As an example', isEdit:false}],
      inputVal: '',
    };
    this.deleteToDo = this.deleteToDo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.edit = this.edit.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
  }

  deleteToDo(todo){
    this.setState((state) => ({
      todos: state.todos.filter((td)=> td !== todo),
    }))
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat({todo:state.inputVal,isEdit:false}),
      inputVal: '',
    }));
  }

  edit(todo){
    
    this.setState((state) => ({
      todos: state.todos.map((td => {
        if(todo !== td)
        return td;
        else{
          return {todo:todo.todo, isEdit:true, editVal:todo}
        }
      })),
    }
    ))
  }

  onEditChange(e,todo){
    this.setState((state) => ({
      todos: state.todos.map((td => {
        if(todo !== td)
        return td;
        else{
          return {todo:todo.todo, isEdit:true, editVal:e.target.value}
        }
      })),
    }));
  }

  onResubmit(todo){
    this.setState((state) => ({
      todos: state.todos.map((td => {
        if(todo !== td)
        return td;
        else{
          return {todo:todo.editVal, isEdit:false, editVal:''}
        }
      })),
    }));
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo.todo}> {todo.isEdit? <input defaultValue={todo.todo} onChange={(e) => this.onEditChange(e,todo)}/> : todo.todo}
            {todo.isEdit ? <button onClick={() => this.onResubmit(todo)}>Resubmit</button> : <button onClick={() => this.edit(todo)}>Edit</button> }
            <button onClick={() => this.deleteToDo(todo)}>Delete</button>
            </li>
          ))}
        </ul>
        <ClassCount todos={this.state.todos} />
      </section>
    );
  }
}

export default ClassInput;
