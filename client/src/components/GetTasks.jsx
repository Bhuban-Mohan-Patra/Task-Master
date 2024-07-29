import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const GetTasks = () => {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendTasks = async (e) => {
    e.preventDefault();

    if (!email || !date) {
      setErrorMessage('Please fill in both fields.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/send-tasks', { email, date });
      setSuccessMessage('Tasks sent successfully.');
      setEmail('');
      setDate('');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Error sending tasks.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <Container style={{ maxWidth: '600px', marginTop: '20px' }}>
      <h2>Get Tasks</h2>
      <Form onSubmit={handleSendTasks}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <Button variant="primary" type="submit" className="mt-3">
          Send
        </Button>
      </Form>
      {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
    </Container>
  );
};

export default GetTasks;
