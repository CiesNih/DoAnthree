import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JobListPage from './pages/JobListPage';
import CandidateListPage from './pages/CandidateListPage';
import TestAPI from './pages/TestAPI';
// Trang chi tiết:
import JobDetail from './pages/JobDetail';

import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <div className="app-container">
        {}
        <Sidebar />

        <main className="main-content">
          <Routes>
            {}
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<JobListPage />} />
            {}
            <Route path="/candidates" element={<CandidateListPage />} />
            {}
            <Route path="/jobs/:id" element={<JobDetail />} />
            {}
            <Route path="/test-api" element={<TestAPI />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;