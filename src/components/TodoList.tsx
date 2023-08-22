import React from 'react'
import './TodoList.css'

interface TodoListProps{
  items:{ _id: string; name: string; description: string; updatedAt: string }[]
  onDeleteTodo:(_id: string) => void;
}

const TodoList:React.FC<TodoListProps> = (props) => {

  return (
    <ul>
      {props.items.map(todo => (
        <li key={todo._id}>
          <span>{todo.name}</span>
          <span>{todo.description}</span>
          <button onClick={() => props.onDeleteTodo(todo._id)}>Delete</button>
        </li>
      ))}

    </ul>
  )
}

export default TodoList