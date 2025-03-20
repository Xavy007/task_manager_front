import { useState } from 'react'
import './App.css'
import Login  from "./components/Login"
import Register from './components/Register';
import Error from './components/Error';
import Dashboard from './components/Dashboard';
import ProtectedRoute from "./components/ProtectedRoute";
import Tasks from './components/Tasks';
import Users from'./components/Users';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/error" element={<Error />}/>
        <Route path="/tasks" element={<Tasks />}/>
        <Route path="/users" element={<Users />}/>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>}/>
      </Routes>
    </Router>
) ;
}

export default App
