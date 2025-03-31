import React from 'react';
import Web3Provider from './context/web3Provider'; // Corrected import for default export
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ethers } from 'ethers'; // Import ethers (you might use it here or in child components)
import Home from './components/Home.jsx';
import RegisterCampaign from './components/RegisterCampaign.jsx';
import CampaignsContainer from './components/CampaignsContainer.jsx';
import ManagerActionsContainer from './components/ManagerActionsContainer.jsx';

const App = () => {
  return (
    <Web3Provider>
      <Router>
        <div>
          <nav style={{ display: 'flex', borderRadius:'20px', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f9f7bd', width: '50%', margin: '0 auto', top:'10', display:'flex' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexGrow: 1 }}>

              <Link to="/" style={{ textDecoration: 'none', color:'black' }}>Home</Link>
              <Link to="/register" style={{ textDecoration: 'none', color:'black'  }}>Register Campaign</Link>
              <Link to="/campaigns" style={{ textDecoration: 'none', color:'black'  }}>Campaigns</Link>
              <Link to="/manager" style={{ textDecoration: 'none', color:'black'  }}>Manager Actions</Link>
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

       

    </Web3Provider>
  );
};

export default App;
