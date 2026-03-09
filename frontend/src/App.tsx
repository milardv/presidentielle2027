import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Polls from './pages/Polls.tsx'
import PersonalProfile from './pages/PersonalProfile.tsx'
import Profile from './pages/Profile.tsx'
import Analysis from './pages/analysis.tsx'
import CandidateVideos from './pages/CandidateVideos.tsx'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/profile" element={<PersonalProfile />} />
        <Route path="/candidats/:candidateId" element={<Profile />} />
        <Route path="/candidats/:candidateId/videos" element={<CandidateVideos />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
