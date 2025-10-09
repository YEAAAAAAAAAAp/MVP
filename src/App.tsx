import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

// Pages
import HomePage from './pages/HomePage'
import ArtistPage from './pages/ArtistPage'
import CollectorPage from './pages/CollectorPage'
import ArtworkDetailPage from './pages/ArtworkDetailPage'
import AIMatchResultPage from './pages/AIMatchResultPage'
import ContactArtistPage from './pages/ContactArtistPage'
import PurchasePage from './pages/PurchasePage'
import ArtistRegisterPage from './pages/ArtistRegisterPage'
import LoginPage from './pages/LoginPage'

// Components
import Header from './components/common/Header'
import Footer from './components/common/Footer'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  flex: 1;
  padding: 0;
`

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artist" element={<ArtistPage />} />
            <Route path="/collector" element={<CollectorPage />} />
            <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
            <Route path="/ai-match-result" element={<AIMatchResultPage />} />
            <Route path="/contact/:artist" element={<ContactArtistPage />} />
            <Route path="/purchase/:id" element={<PurchasePage />} />
            <Route path="/artist/register" element={<ArtistRegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  )
}

export default App