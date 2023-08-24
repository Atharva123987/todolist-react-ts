import React, { useState, useEffect } from 'react';
import Axios from 'axios'; // Make sure to have Axios installed
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<{ _id: string; name: string; description: string; updatedAt: string }[]>([]);
  const [isEdited, setIsEdited] = useState<boolean>(false)

  useEffect(() => {
    getTasks()
  }, []);

  const getTasks = () => {
    Axios.get('https://task-manager-r4w2.onrender.com/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }


  const todoHandler = (name: string, description: string) => {
    createTask(name, description);
  };

  const createTask = (name: string, description: string) => {
    const newTask = {
      name: name ? name : "",
      description: description ? description : ""
    };

    Axios.post('https://task-manager-r4w2.onrender.com/tasks', newTask)
      .then(response => {
        setTasks(prevTasks => [...prevTasks, response.data]);
        getTasks()
      })
      .catch(error => {
        console.error('Error creating task:', error);
      });
  };


  const deleteTask = (_id: string) => {
    Axios.delete(`https://task-manager-r4w2.onrender.com/tasks/${_id}`)
      .then(response => {
        setTasks(prevTasks => prevTasks.filter(task => task._id !== _id));
        getTasks()
        console.log(response)
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const editTask = (_id: string, name: string, description: string) => {
    Axios.patch(`https://task-manager-r4w2.onrender.com/tasks/${_id}`, { name: name, description: description }).then((res) => {
      setTasks(prev => [...prev, res.data])
      getTasks()
      console.log(res)
    })

  }


  return (
    <div className='App'>
      <NewTodo onAddTodo={todoHandler} setIsEdited={setIsEdited} isEdited={isEdited} />
      <TodoList items={tasks} onDeleteTodo={deleteTask} onEditTodo={editTask} isEdited={isEdited} setIsEdited={setIsEdited} />

    </div>
  )
}

export default App;
