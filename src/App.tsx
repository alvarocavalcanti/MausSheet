import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CharacterList from './components/CharacterList';
import CharacterForm from './components/CharacterForm';
import HelpPage from './components/HelpPage';
import { Analytics } from "@vercel/analytics/react"

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/new" element={<CharacterForm />} />
        <Route path="/edit/:id" element={<CharacterForm />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
      <Analytics />
    </Router>
  );
};

export default App;
