import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import DocumentationPage from './components/DocumentationPage';
import DetailPage from './components/DetailPage';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <NavLink to="/"> Home </NavLink>
    <NavLink to="/docs"> Documentation </NavLink>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/docs" element={<DocumentationPage/>} />
        <Route path="/details" element={<DetailPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
