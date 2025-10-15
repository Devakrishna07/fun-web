import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LetterPage from './pages/LetterPage'

const App = () => {
  return (
    <BrowserRouter>
       <div>
        <Routes>
          <Route path='/' element={<LetterPage />} />
        </Routes>
       </div>
    </BrowserRouter>
  )
}

export default App
