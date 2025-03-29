import { contractAddress, CrowdFunding } from '../constant/constants'; 
import React, { useState, useContext, useEffect } from 'react';
import { Web3Context } from '../context/web3Context';
import { ethers } from 'ethers';

const Campaigns = () => {
    const { web3State } = useContext(Web3Context);
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaignId, setSelectedCampaignId] = useState(null);
    const [donationAmount, setDonationAmount] = useState('');
    const [donators, setDonators] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        setError(null);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, CrowdFunding.abi, signer);
  
        const campaignList = await contract.showCampaigns();
        setCampaigns(campaignList);
      } catch (err) {
        setError(err.message || "Failed to fetch campaigns.");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (web3State.selectedAccount) {
        fetchCampaigns();
      }
    }, [web3State.selectedAccount]);
  
    const donateToCampaignHandler = async () => {
      if (!window.ethereum) {
        setError("Please install MetaMask or a compatible wallet.");
        return;
      }
      if (!selectedCampaignId) {
        setError("Please select a campaign to donate to.");
        return;
      }
      if (!donationAmount) {
        setError("Please enter an amount to donate.");
        return;
      }
      setError(null);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, CrowdFunding.abi, signer);
  
        const donationAmountInWei = ethers.parseEther(donationAmount);
        const tx = await contract.donateToCampaign(selectedCampaignId, {
          value: donationAmountInWei,
        });
        await tx.wait();
        alert('Donation successful!');
        setDonationAmount('');
        fetchCampaigns();
  
      } catch (err) {
        setError(err.message || 'Donation failed.');
      }
    };
  
    const getDonators = async (campaignId) => {
      try {
        setLoading(true);
        setError(null);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, CrowdFunding.abi, signer);
  
        const donatorList = await contract.getDonators(campaignId);
        setDonators(donatorList);
        setSelectedCampaignId(campaignId);
      } catch (err) {
        setError(err.message || "Failed to fetch donators.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
        <div >
            <div style={{ padding: '20px' }}>
                <h2>Campaigns</h2>
                {loading && <p>Loading campaigns...</p>}
                {error && (
                    <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', marginTop: '10px', border: '1px solid #f5c6cb', borderRadius: '4px', display: 'flex', alignItems: 'center', padding:'10px' }}>
                        <svg style={{ width: '1em', height: '1em', marginRight: '5px', fill: 'currentColor' }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        <div>
                            <h3>Error</h3>
                            <p>{error}</p>
                        </div>
                    </div>
                )}
                {!loading && !error && campaigns.length === 0 && <p>No campaigns available.</p>}
                {!loading && !error && campaigns.map((campaign) => (
                    <div key={campaign.campaignId.toString()} style={{ marginBottom: '16px', border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
                        <h3>{campaign.campaignName}</h3>
                        <p>Started by: {campaign.startedBy}</p>
                        <p>Amount to Raise: {ethers.formatEther(campaign.amountToRaise)} ETH</p>
                        <p>Amount Raised: {ethers.formatEther(campaign.amountRaised)} ETH</p>
                        <p>Amount Remaining: {ethers.formatEther(campaign.amountRemaining)} ETH</p>
                        <p>Start Time: {campaign.startTime.toString()}</p>
                        <p>End Time: {campaign.endTime.toString()}</p>
                        <p>Approval: {campaign.approval ? 'Approved' : 'Pending'}</p>
                        <p>Live: {campaign.isLive ? 'Live' : 'Not Live'}</p>
                        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                            <button onClick={() => setSelectedCampaignId(Number(campaign.campaignId))} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Donate</button>
                            <button onClick={() => getDonators(Number(campaign.campaignId))} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Show Donators</button>
                        </div>
                    </div>
                ))}
                {selectedCampaignId !== null && (
                    <div style={{ marginTop: '16px', border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
                        <h3>Donate to Campaign {selectedCampaignId}</h3>
                        <input
                            placeholder="Amount (ETH)"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                        <button onClick={donateToCampaignHandler} disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            {loading ? 'Donating...' : 'Donate'}
                        </button>
                        {error && (
                            <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', marginTop: '10px', border: '1px solid #f5c6cb', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                                <svg style={{ width: '1em', height: '1em', marginRight: '5px', fill: 'currentColor' }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                <div>
                                    <h3>Error</h3>
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}
                        <h3>Donators</h3>
                        {donators.length > 0 ? (
                            <ul>
                                {donators.map((donator, index) => (
                                    <li key={index}>{donator}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No donators yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Campaigns;
