import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AddTask.css'

const AddTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:01');
  const [isImportant, setIsImportant] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [conflictingTask, setConflictingTask] = useState(null);
  const [showExistingTasks, setShowExistingTasks] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate end time is not before start time
    if (endTime <= startTime && (new Date(`1970-01-01T${endTime}Z`) - new Date(`1970-01-01T${startTime}Z`)) >= 0) {
      setErrorMessage('End time cannot be before or the same as start time.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    // Check for conflicts with existing tasks on the same date
    const conflict = tasks.find(t => t.date === date && (
      (startTime !== endTime) && ((startTime !== '00:00' || endTime !== '00:01')) &&
      (
        (startTime >= t.startTime && startTime < t.endTime) ||
        (endTime > t.startTime && endTime <= t.endTime) ||
        (startTime <= t.startTime && endTime >= t.endTime)
      )
    ));

    if (conflict) {
      setConflictingTask(conflict);
      setErrorMessage('Task already exists for the specified time.');
      setShowExistingTasks(true);
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      const newTask = { task, date, startTime, endTime, isImportant };
      const response = await axios.post('https://task-master-server-0q0u.onrender.com/api/tasks', newTask);

      setTasks([...tasks, response.data]);
      setSuccessMessage('Task added successfully.');
      setTask('');
      setDate('');
      setStartTime('00:00');
      setEndTime('00:01');
      setIsImportant(false);
      setShowExistingTasks(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Error adding/updating task.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleEdit = (taskToEdit) => {
    setTask(taskToEdit.task);
    setDate(taskToEdit.date);
    setStartTime(taskToEdit.startTime);
    setEndTime(taskToEdit.endTime);
    setIsImportant(taskToEdit.isImportant);
  };

  return (
    <Container style={{ maxWidth: '600px', marginTop: '20px' }}>
      <h2>Add Task</h2>
      {conflictingTask && (
        <Alert variant="warning">
          Task conflict with: {conflictingTask.task} (Start: {conflictingTask.startTime}, End: {conflictingTask.endTime})
          <Button variant="secondary" onClick={() => setConflictingTask(null)}>Close</Button>
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTask">
          <Form.Label>Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStartTime">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEndTime">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImportant">
          <Form.Check
            type="checkbox"
            label="Important"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Task
        </Button>
      </Form>
      {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
    </Container>
  );
};

export default AddTask;
