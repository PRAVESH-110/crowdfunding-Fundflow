import React, { useContext } from 'react';
import { Web3Context } from '../context/web3Context';
import Campaigns from './Campaigns';

const CampaignsContainer = () => {
    const { web3State } = useContext(Web3Context);
    return <Campaigns web3State={web3State} />;

  };

  export default CampaignsContainer;
