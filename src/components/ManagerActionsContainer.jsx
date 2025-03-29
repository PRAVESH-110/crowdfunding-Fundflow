import React, { useContext } from 'react';
import { Web3Context } from '../context/web3Context';
import ManagerActions from './ManagerActions';

const ManagerActionsContainer = () => {
    const { web3State } = useContext(Web3Context);
    return <ManagerActions web3State={web3State} />;

  };
  
  export default ManagerActionsContainer;
