import React, { useState } from 'react'
import './TodoList.css'
interface TodoListProps {
  items: { _id: string; name: string; description: string; updatedAt: string }[]
  onDeleteTodo: (_id: string) => void;
  onEditTodo: (_id: string, name: string, description: string) => void;
  isEdited: boolean;
  setIsEdited: (val: boolean) => void
}

const TodoList: React.FC<TodoListProps> = (props) => {
  const [updatedName, setUpdatedName] = useState<string>("")
  const [updatedDesc, setUpdatedDesc] = useState<string>("")

  return (
    <ul>
      {props.items.map(todo => (
        <li key={todo._id}>
          {
            !props.isEdited ? (
              <>
                <div>
                  <span>{todo.name}</span>
                  <span>{todo.description}</span>
                </div>
                <div>
                  <button onClick={() => props.onDeleteTodo(todo._id)}>Delete</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <span>Title<input type='text' placeholder='Name' defaultValue={todo.name} onChange={(e) => setUpdatedName(e.target.value)} /></span>
                  <span>Description<input type='text' placeholder='Description' defaultValue={todo.description} onChange={(e) => setUpdatedDesc(e.target.value)} /></span>
                </div>
                <div>
                  <button onClick={() => props.onEditTodo(todo._id, updatedName ? updatedName : todo.name, updatedDesc ? updatedDesc : todo.description)}>Submit</button>

                </div>
              </>
            )
          }

        </li>
      ))}
    </ul>
  )
}

export default TodoList