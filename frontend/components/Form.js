import React from 'react'

export default class Form extends React.Component {
  render() { 
    return (
      <div>
         <form id="todoForm" onSubmit={this.props.onTodoInputSubmit}>
          <input 
          value={this.props.todoInput} 
          onChange={this.props.onTodoInputChange} 
          type="text" 
          placeholder="Add Todo Here">
          </input>
          <input type="submit"></input>
        </form>
        <button onClick={this.props.handleClear}>Clear Completed Todo's</button>
      </div>
    )
  }
}
