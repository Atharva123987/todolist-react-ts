import React, { useState, useEffect } from 'react';
import Axios from 'axios'; // Make sure to have Axios installed
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<{ _id: string; name: string; description: string; updatedAt: string }[]>([]);

  useEffect(() => {
    Axios.get('https://task-manager-r4w2.onrender.com/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, [tasks]);


  const todoHandler = (name: string, description: string) => {
    createTask(name, description);
  };
  
  const createTask = (name: string, description: string) => {
    const newTask = {
      name: name,
      description: description
    };
  
    Axios.post('https://task-manager-r4w2.onrender.com/tasks', newTask)
      .then(response => {
        setTasks(prevTasks => [...prevTasks, response.data]);
      })
      .catch(error => {
        console.error('Error creating task:', error);
      });
  };
  

  const deleteTask = (_id: string) => {
    Axios.delete(`https://task-manager-r4w2.onrender.com/tasks/${_id}`)
      .then(response => {
        setTasks(prevTasks => prevTasks.filter(task => task._id !== _id));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };
  

  return (
    <div className='App'>
      <NewTodo onAddTodo={todoHandler} />
      <TodoList items={tasks} onDeleteTodo={deleteTask} />

    </div>
  )
}

export default App;
