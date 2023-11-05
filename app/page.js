"use client"
import React, { useState } from 'react';

const TodoListPage = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tasks, setTasks] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), title, desc, completed: false };
    setTasks([...tasks, newTask]);
    setTitle('');
    setDesc('');
  };

  const deleteHandler = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const completeHandler = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed }; // Toggle completion
      }
      return task;
    }));
  };

  const renderTask = (task, index) => (
    <li key={task.id} className='flex items-center justify-between mb-8'>
      <div className='flex items-center justify-between mb-5 w-2/3'>
        <h5 className={`text-2xl font-semibold ${task.completed ? 'line-through' : ''}`}>{task.title}</h5>
        <h6 className={`text-lg font-medium ${task.completed ? 'line-through' : ''}`}>{task.desc}</h6>
      </div>
      <div>
        <button
          onClick={() => completeHandler(task.id)}
          className={`mr-2 ${task.completed ? 'bg-green-400' : 'bg-blue-400'} text-white px-4 py-2 rounded font-bold`}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => deleteHandler(task.id)}
          className='bg-red-400 text-white px-4 py-2 rounded font-bold'
        >
          Delete
        </button>
      </div>
    </li>
  );

  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>Kali Todo List</h1>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          className='text-black border-zinc-800 border-4 m-5 px-4 py-2'
          placeholder='Enter Task Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          className='text-black border-zinc-800 border-4 m-5 px-4 py-2'
          placeholder='Enter Task Description'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit" className='bg-black text-white px-4 py-2 text-2xl font-bold rounded m-5'>Add Task</button>
      </form>
      <hr />
      <div className='p-8 bg-slate-200'>
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task, index) => !task.completed && renderTask(task, index))
          ) : (
            <h2>No Task Available</h2>
          )}
        </ul>
      
      </div>
      <div className='mt-5 p-8 bg-slate-200'>
      <h3 className='text-xl font-bold mt-5'>Completed Tasks</h3>
        <ul>
          {tasks.map((task, index) => task.completed && renderTask(task, index))}
        </ul>
      
      </div>
      
    </>
  );
};

export default TodoListPage;

