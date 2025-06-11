import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import the pages components
import HomePage from './Pages/HomePage'
import LLMPage from './Pages/LLmPage' // Corrected import path

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ai" element={<LLMPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App