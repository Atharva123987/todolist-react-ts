import React,{useState} from 'react'
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

const App: React.FC = () => {
  
  const [todos , setTodos ] = useState<{id:string , text:string}[]>([]);

  const todoHandler = ( text:string) =>{
    setTodos([...todos ,{id: Math.random().toString() , text : text}])
  }

  const todoDeleteHandler = ( todoID : string) =>{
    setTodos( todos.filter( todo => todo.id !== todoID))
  } 

  return (
    <div className='App'>
      <NewTodo onAddTodo={todoHandler}/>
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler}/>
    </div>
  )
}

export default App
