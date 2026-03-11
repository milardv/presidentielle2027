import './App.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Polls from './pages/Polls.tsx'
import PersonalProfile from './pages/PersonalProfile.tsx'
import Profile from './pages/Profile.tsx'
import CandidateTweets from './pages/CandidateTweets.tsx'
import CandidateVideos from './pages/CandidateVideos.tsx'
import SeoLandingPage from './pages/SeoLandingPage.tsx'
import { seoPages } from './seo/seoPagesData.js'

const CandidateAnalysis = lazy(() => import('./pages/CandidateAnalysis.tsx'))

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/profile" element={<PersonalProfile />} />
          {seoPages.map((page) => (
            <Route key={page.slug} path={`/${page.slug}`} element={<SeoLandingPage pageSlug={page.slug} />} />
          ))}
          <Route path="/candidats/:candidateId" element={<Profile />} />
          <Route path="/candidats/:candidateId/videos" element={<CandidateVideos />} />
          <Route path="/candidats/:candidateId/tweets" element={<CandidateTweets />} />
          <Route path="/candidats/:candidateId/analysis" element={<CandidateAnalysis />} />
          <Route path="/analysis" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
