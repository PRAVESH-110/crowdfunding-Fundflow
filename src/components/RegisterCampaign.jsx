import React, { useContext, useState } from 'react';
import { Web3Context } from '../context/web3Context';
import { ethers } from 'ethers';
import { contractAddress, abi, } from '../constant/constants';

const RegisterCampaign = () => {
    const { web3State } = useContext(Web3Context);
    const [campaignName, setCampaignName] = useState('');
    const [amountToRaise, setAmountToRaise] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const convertToUnixTime = (dateString) => {
        return Math.floor(new Date(dateString).getTime() / 1000);
    };

    const registerCampaignHandler = async () => {
        const startTimeUnix = convertToUnixTime(startTime);
        const endTimeUnix = convertToUnixTime(endTime);

        if (!web3State.selectedAccount) {
            setError("Please connect your wallet.");
            return;
        }
        if (!window.ethereum) {
            setError("Please install MetaMask or a compatible wallet.");
            return;
        }
        if (!campaignName || !amountToRaise || !startTime || !endTime) {
            setError("Please fill in all fields.");
            return;
        }
  
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
  
            const amountToRaiseInWei = ethers.parseEther(amountToRaise);
  
            const tx = await contract.registerCampaign(
                campaignName,
                amountToRaiseInWei,
                startTimeUnix,
                endTimeUnix
            );
            await tx.wait();
            setSuccess("Your campaign has been registered.");
            setCampaignName('');
            setAmountToRaise('');
            setStartTime('');
            setEndTime('');
        } catch (err) {
            setError(err.message || "An error occurred while registering the campaign.");
        } finally {
            setLoading(false);
        }
    };
  
    return (
        <div>
            
            <div style={{ padding: '20px',  alignItems: 'center', justifyContent: 'center',  }}>
                
                <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                    <h3>Campaign Details</h3>
                    <p>Provide information for your new campaign.</p>
                    <input
                        placeholder="Campaign Name"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        disabled={loading}
                        style={{ width: '95%', padding: '8px', marginBottom: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor:'white', color:'black' }}
                    />
                    <input
                        placeholder="Amount to Raise (ETH)"
                        value={amountToRaise}
                        onChange={(e) => setAmountToRaise(e.target.value)}
                        disabled={loading}
                        style={{ width: '95%', padding: '8px', marginBottom: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor:'white', color:'black' }}
                    />
                    <input
                        type="datetime-local"
                        placeholder="Start Time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        disabled={loading}
                        style={{ width: '95%', padding: '8px', marginBottom: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor:'white', color:'black' }}
                    />
                    <input
                        type="datetime-local"
                        placeholder="End Time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        disabled={loading}
                        style={{ width: '95%', padding: '8px', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor:'white', color:'black' }}
                    />
                    <button onClick={registerCampaignHandler}  disabled={loading || !web3State.selectedAccount} style={{ padding: '8px 16px', backgroundColor: '#2C2C2C', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        {loading ? 'Registering...' : 'Register Campaign'}
                    </button>
                    {success && (
                        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', marginTop: '10px', border: '1px solid #c3e6cb', borderRadius: '4px' }}>
                            <h3>Success!</h3>
                            <p>Your campaign has been registered.</p>
                        </div>
                    )}
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
    );
};

export default RegisterCampaign;
