import React, { useState } from 'react';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tasks from '../components/Tasks';
import AddTask from '../components/AddTask';
import GetTasks from '../components/GetTasks';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Tasks tasks={tasks} setTasks={setTasks} />} />
          <Route path="/add-task" element={<AddTask tasks={tasks} setTasks={setTasks} />} />
          {/* <Route path="/get-tasks" element={<GetTasks/>} /> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
};

export default Home;
