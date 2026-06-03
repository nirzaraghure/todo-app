```javascript
import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskColumn from './components/TaskColumn';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, { id: uuidv4(), ...newTask }]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="app">
      <TaskForm handleAddTask={handleAddTask} />
      <main className="app_main">
        <TaskColumn
          title="To do"
          icon={todoIcon}
          tasks={tasks.filter((task) => task.status === "todo")}
          status="todo"
          handleDelete={handleDeleteTask}
          handleUpdateTask={handleUpdateTask}
        />
        <TaskColumn
          title="Doing"
          icon={doingIcon}
          tasks={tasks.filter((task) => task.status === "doing")}
          status="doing"
          handleDelete={handleDeleteTask}
          handleUpdateTask={handleUpdateTask}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={tasks.filter((task) => task.status === "done")}
          status="done"
          handleDelete={handleDeleteTask}
          handleUpdateTask={handleUpdateTask}
        />
      </main>
    </div>
  );
};

export default App;
```