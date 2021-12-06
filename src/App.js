import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import DetailPage from './components/DetailPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/details" element={<DetailPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
