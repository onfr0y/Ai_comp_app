import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import the pages components
import HomePage from './Pages/HomePage'
import LLMPage from './Pages/LLmPage' // Corrected import path
import WeatherPage from './Pages/WeatherPage.jsx'; // Import the new WeatherPage

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ai" element={<LLMPage />} />
        <Route path="/weather" element={<WeatherPage />} /> {/* Add this new route */}
      </Routes>
    </BrowserRouter>
  )
}

export default App