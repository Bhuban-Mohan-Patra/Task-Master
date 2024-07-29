import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/TaskMasterLogo.png'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid d-flex">
      <div className='flex-start'>
      <Link className="navbar-brand" to="/"> 
      <img src={logo} alt='Logo' className='w-25'/>
      </Link>
      </div>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className='flex-end'>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          
          <li className="nav-item pr-4" >
            <Link className="nav-link" to="/">Tasks</Link>
          </li>
          <li className="nav-item pr-4 ">
            <Link className="nav-link" to="/add-task">AddTasks</Link>
          </li>
          {/* <li className="nav-item pr-2">
            <Link className="nav-link" to="/get-tasks">Get Tasks</Link>
          </li> */}
        </ul>
      </div>
      </div>
    </div>
  </nav>
  )
}

export default Header
