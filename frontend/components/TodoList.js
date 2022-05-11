import React from 'react'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
      <h2>Todo List</h2>
      {
        this.props.todos.map(todo => {
          return <div onClick={this.props.toggleCompleted(todo.id)} key={todo.id}>{todo.name} {todo.completed ? "  ✔️" : "  ❌"} </div>
        })
      }
    </div>
    )
  }
}
