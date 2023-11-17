import TaskList from './components/TaskList';
import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import CreateTaskForm from './components/CreateTaskForm';
import axios from 'axios';

// const BASE_URL = "http://127.0.0.1:5000";
const baseURL = "https://task-list-be-de7a55c3f23e.herokuapp.com";

const convertFromApi = (apiTask) => {
  const { id, title, description, is_complete } = apiTask;
  const newTask = { id, title, description, isComplete: is_complete };
  return newTask;
};

const fetchTargeTask = async (id) => {
  const catResponse = await axios.get(`${baseURL}/tasks/${id}`);
  const task = convertFromApi(catResponse.data.task);
  return task
}

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addTask = async (formData) => {
    const response = await axios.post(`${baseURL}/tasks`, formData);
    const newTask = response.data;
    setTasks((prevTasks) => {
      return [...prevTasks, newTask]
    })
  };

  const deleteTask = async (id) => {
    await axios.delete(`${baseURL}/tasks/${id}`)
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== id)
    })
  };

  const toggleIsComplete = async (id) => {
    const task = await fetchTargeTask(id)

    const mark = !task.isComplete ? 'mark_complete' : 'mark_incomplete';

    const response = await axios.patch(`${baseURL}/tasks/${id}/${mark}`);

    const newTask = convertFromApi(response.data);
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return newTask
        } else {
          return task
        }
      });
    });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(`${baseURL}/tasks`);
      const tasks = response.data.map(convertFromApi);
      setTasks(tasks)
      setIsLoading(false)

    }
    fetchTasks();
  }, [tasks])

  return (
    <div className="App">
      <Header />
      <CreateTaskForm addTask={addTask} />
      {isLoading && <h1 id='loading'>Loading...</h1>}
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleIsComplete={toggleIsComplete} />
    </div>
  );
};


export default App;
