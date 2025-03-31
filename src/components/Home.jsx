import React, { useContext } from 'react';
import { Web3Context } from '../context/web3Context';

const Home = () => {
    const { web3State } = useContext(Web3Context);
    return (
        <div>
            
            <div style={{ padding: '20px', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                <h1 > Welcome to FundFlow</h1>
                <p>FundFlow is a decentralized public crowdfunding platform built with React and blockchain technology. It allows creators and innovators to raise funds directly from supporters without relying on intermediaries. By leveraging smart contracts, FundFlow ensures secure, transparent, and tamper-proof transactions, giving backers confidence in the funding process. The platform provides real-time tracking of funding progress, secure wallet integration, and automated disbursement of funds upon goal completion. FundFlow empowers creators while giving backers full visibility and control over their contributions</p>
                {web3State.selectedAccount && (
                    <p>Connected Account: {web3State.selectedAccount}</p>
                )}
            </div>
        </div>
    );
};

export default Home;
