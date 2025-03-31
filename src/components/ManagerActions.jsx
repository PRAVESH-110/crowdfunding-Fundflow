import React, { useContext, useState } from 'react';
import { Web3Context } from '../context/web3Context';
import { ethers } from 'ethers';
import { contractAddress, abi } from '../constant/constants';

const ManagerActions = () => {
    const { web3State } = useContext(Web3Context);
    const [campaignId, setCampaignId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleApproveCampaign = async () => {
        if (!web3State.selectedAccount) {
            setError("Please connect your wallet.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, CrowdFunding.abi, signer);

            const tx = await contract.managerApproval(campaignId);
            await tx.wait();
            alert('Campaign approval status toggled!');
        } catch (err) {
            setError(err.message || 'Failed to toggle campaign approval.');
        } finally {
            setLoading(false);
        }
    };

    const handleStartCampaign = async () => {
        if (!web3State.selectedAccount) {
            setError("Please connect your wallet.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, CrowdFunding.abi, signer);

            const tx = await contract.startCampaign(campaignId);
            await tx.wait();
            alert('Campaign started!');
        } catch (err) {
            setError(err.message || 'Failed to start campaign.');
        } finally {
            setLoading(false);
        }
    };

    const handleWithdrawFunds = async () => {
        if (!web3State.selectedAccount) {
            setError("Please connect your wallet.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            const tx = await contract.withdrawFund(campaignId);
            await tx.wait();
            alert('Funds withdrawn!');
        } catch (err) {
            setError(err.message || 'Failed to withdraw funds.');
        } finally {
            setLoading(false);
        }
    };

    const handleWithdrawAllFunds = async () => {
        if (!web3State.selectedAccount) {
            setError("Please connect your wallet.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, CrowdFunding.abi, signer);

            const tx = await contract.withdrawAllFund();
            await tx.wait();
            alert('All funds withdrawn!');
        } catch (err) {
            setError(err.message || 'Failed to withdraw all funds.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ padding: '20px' }}>
                <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '26px', marginBottom: '16px', alignSelf:'center', alignContent:'center' }}>
                    <h3>Campaign ID</h3>
                    <p>Enter the ID of the campaign to manage.</p>
                    <input
                        placeholder="Campaign ID"
                        value={campaignId}
                        onChange={(e) => setCampaignId(e.target.value)}
                        type="number"
                        style={{ width: '95%', padding: '13px', marginBottom: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding:'30px' }}>
                    <button onClick={handleApproveCampaign} disabled={loading} style={{ padding: '10px 16px', backgroundColor: '#FFD700', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily:'revert-layer', width:'70%', alignSelf:'center' }}>
                        {loading ? 'Approving...' : 'Toggle Campaign Approval'}
                    </button>
                    <button onClick={handleStartCampaign} disabled={loading} style={{ padding: '10px 16px', gap: '18px', backgroundColor: '#FFD700', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', width:'70%', alignSelf:'center' }}>
                        {loading ? 'Starting...' : 'Start Campaign'}
                    </button>
                    <button onClick={handleWithdrawFunds} disabled={loading} style={{ padding: '10px 16px', gap: '18px', backgroundColor: '#FFD700', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', width:'70%', alignSelf:'center' }}>
                        {loading ? 'Withdrawing...' : 'Withdraw Funds'}
                    </button>
                    <button onClick={handleWithdrawAllFunds} disabled={loading} style={{ padding: '10px 16px', gap: '18px', backgroundColor: '#FFD700', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', width:'70%', alignSelf:'center' }}>
                        {loading ? 'Withdrawing...' : 'Withdraw All Funds'}
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
                </div>


                </div>
                
            </div>
        </div>
    );
};

export default ManagerActions;
