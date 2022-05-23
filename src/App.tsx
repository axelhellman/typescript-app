import React from 'react';
import ProjectPage from './components/ProjectPage'
import ProjectPageId from './components/ProjectPageId'

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './home/HomePage'
import './App.css';
function App() {
  return (
  <Router>
    <header className="sticky">
    <span className="logo">
    </span>
    <NavLink to="/" className="button--rounded">
    <span className="icon--home"></span>
      Home
    </NavLink>
    <NavLink to="/projects" className="button--rounded">
      Project
    </NavLink>
    <hr></hr>
    </header>

    <div  className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage/>} />
        <Route path="/projects/:id" element={<ProjectPageId/>} />
      </Routes>
    </div>
  </Router>
  )
}

export default App;
