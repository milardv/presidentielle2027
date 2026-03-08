import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Profile from './pages/Profile.tsx'
import Analysis from './pages/analysis.tsx'
import Compare from './pages/Compare.tsx'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:candidateId" element={<Profile />} />
        <Route path="/profile" element={<Navigate to="/" replace />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
