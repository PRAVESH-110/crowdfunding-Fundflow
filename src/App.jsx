import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ethers } from 'ethers'; // Import ethers (you might use it here or in child components)
import Home from './components/Home.jsx';
import RegisterCampaign from './components/RegisterCampaign.jsx';
import CampaignsContainer from './components/CampaignsContainer.jsx';
import ManagerActionsContainer from './components/ManagerActionsContainer.jsx';



const App = () => {
  return (
    <Router>
      <div>
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexGrow: 1 }}>
            <Link to="/">Home</Link>
            <Link to="/register">Register Campaign</Link>
            <Link to="/campaigns">Campaigns</Link>
            <Link to="/manager">Manager Actions</Link>
          </div>
          
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterCampaign />} />
          <Route path="/campaigns" element={<CampaignsContainer />} />
          <Route path="/manager" element={<ManagerActionsContainer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
