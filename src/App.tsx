import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CharacterList from './components/CharacterList';
import CharacterForm from './components/CharacterForm';
import HelpPage from './components/HelpPage';
import { Analytics } from "@vercel/analytics/react"
import InventoryItemList from './components/InventoryItemList';
import InventoryItemForm from './components/InventoryItemForm';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/new" element={<CharacterForm />} />
        <Route path="/items" element={<InventoryItemList />} />
        <Route path="/new-item" element={<InventoryItemForm />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
      <Analytics />
    </Router>
  );
};

export default App;
