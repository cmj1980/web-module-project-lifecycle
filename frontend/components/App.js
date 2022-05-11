import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: "",
    todoInput: "",
    
  }
  
  onTodoInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoInput: value });
  }

  resetInput = () => this.setState({ ...this.state, todoInput: "" });

  setResError = err =>  this.setState({ ...this.state, error: err.response.data.message });
 
  newPost = () => {
    axios.post(URL, {name: this.state.todoInput})
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data)  });
      this.resetInput();
      
    })
    .catch(this.setResError);
  }

  onTodoInputSubmit = evt => {
    evt.preventDefault();
    this.newPost();
  }

  fetchAll = () => {
    axios.get(URL) 
      .then(res => {
        //console.log(res)
        this.setState({ ...this.state, todos: res.data.data})
      })
      .catch(this.setResError)
  }

  toggleCompleted = id => evt => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
     this.setState({ ...this.state, todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return res.data.data
      }) 
     })
    })
    .catch(this.setResError)
  }

  handleClear = () => {
    this.setState({ 
      ...this.state,
      todos: this.state.todos.filter(todo => {
        return (todo.completed === false)
      })
     });

  }

  componentDidMount() {
   this.fetchAll()
  }

  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id="todos">
          <h2>Todo List</h2>
          {
            this.state.todos.map(todo => {
              return <div onClick={this.toggleCompleted(todo.id)} key={todo.id}>{todo.name} {todo.completed ? "  ✔️" : "  ❌"} </div>
            })
          }
        </div>
        <form id="todoForm" onSubmit={this.onTodoInputSubmit}>
          <input value={this.state.todoInput} onChange={this.onTodoInputChange} type="text" placeholder="Add Todo Here"></input>
          <input type="submit"></input>
        </form>
        <button onClick={this.handleClear}>Clear Completed Todo</button>
      </div>
    )
  } 
}
