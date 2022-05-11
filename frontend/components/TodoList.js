import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
      <h2>Todo List</h2>
      {
        this.props.todos.map(todo => {
          return (
            <Todo 
            key={todo.id}
            toggleCompleted={this.props.toggleCompleted}
            todo={todo}
            />

          )
        })
      }
    </div>
    )
  }
}
