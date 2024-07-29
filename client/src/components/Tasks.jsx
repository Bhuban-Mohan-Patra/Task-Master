import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, updateTask, deleteTask } from '../services/taskService';
import "./Task.css"

const Tasks = ({ tasks, setTasks }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substr(0, 10));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
    fetchTasks();
  }, [setTasks]);

  const handleComplete = async (id) => {
    const taskToUpdate = tasks.find(task => task._id === id);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    try {
      await updateTask(id, updatedTask);
      setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleEdit = (task) => {
    navigate('/add-task', { state: { task } });
  };

  const filteredTasks = tasks
    .filter(task => task.date === selectedDate)
    .sort((a, b) => {
      const startTimeA = a.startTime === '00:00' ? 24 * 60 : parseInt(a.startTime.replace(':', ''), 10);
      const startTimeB = b.startTime === '00:00' ? 24 * 60 : parseInt(b.startTime.replace(':', ''), 10);

      if (a.isImportant && b.isImportant) {
        return startTimeA - startTimeB;
      }
      if (a.isImportant && !b.isImportant) {
        return -1;
      }
      if (!a.isImportant && b.isImportant) {
        return 1;
      }
      return startTimeA - startTimeB;
    });

  return (
    <div className="container mt-5 cover">
      <h2>Tasks</h2>
      <div className="form-group">
        <label htmlFor="date">Select Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      {filteredTasks.length === 0 ? (
        <p>No tasks for the selected date.</p>
      ) : (
        filteredTasks.map(task => (
          <div key={task._id} className={`card mb-3 ${task.isImportant ? 'border-warning' : ''} ${task.completed ? 'bg-light text-muted' : ''}`}>
            <div className="card-body">
              <h5 className="card-title">{task.task}</h5>
              <p className="card-text">
                <strong>Date:</strong> {task.date}<br />
                <strong>Start Time:</strong> {task.startTime}<br />
                <strong>End Time:</strong> {task.endTime === '00:01' ? '00:00' : task.endTime}<br />
                <strong>Important:</strong> {task.isImportant ? 'Yes' : 'No'}
              </p>
              <div className="btn-group">
                <button
                  className="btn btn-success"
                  onClick={() => handleComplete(task._id)}
                  disabled={task.completed}
                >
                  {task.completed ? 'Completed' : 'Mark Complete'}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(task)}
                  disabled={task.completed}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Tasks;
