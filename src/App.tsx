import React,{useState} from 'react'
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

const App: React.FC = () => {
  
  const [todos , setTodos ] = useState<{id:string , text:string}[]>([]);

  const todoHandler = ( text:string) =>{
    setTodos([...todos ,{id: Math.random().toString() , text : text}])
  }

  return (
    <div className='App'>
      <NewTodo onAddTodo={todoHandler}/>
      <TodoList items={todos}/>
    </div>
  )
}

export default App
