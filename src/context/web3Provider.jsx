import { useEffect, useState } from "react";
import { Web3Context } from "./web3Context.jsx"; // Updated import to match the correct file extension

import { getWeb3State } from "../utils/getWeb3State";
import { handleAccountChange } from "../utils/handleAccountChange";
import { handleChainChange } from "../utils/handleChainChange";

const Web3Provider = ({children})=>{
  const [web3State,setWeb3State]=useState({
    contractInstance:null,
    selectedAccount:null,
    chainId:null,
    signer:null,
    provider:null
  })
  const handleWallet = async()=>{
    try{
        const {contractInstance,selectedAccount,chainId,signer,provider} = await getWeb3State();
        setWeb3State({contractInstance,selectedAccount,chainId,signer,provider})
    }catch(error){
        console.error(error)
    }
  }
  useEffect(()=>{
    window.ethereum.on('accountsChanged',()=>handleAccountChange(setWeb3State))
    window.ethereum.on('chainChanged',()=>handleChainChange(setWeb3State))
    
    return()=>{
      window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setWeb3State))
      window.ethereum.removeListener('chainChanged',()=>handleChainChange(setWeb3State))
  }
  
  },[])
  
  return (
    <> 
      <button onClick={handleWallet} style={{ position: 'absolute', top: '10px', left: '10px', borderRadius: '20px', width: '170px', height: '40px', backgroundColor: '#FFD700' , color: 'black', paddingRight:'10px' }}>Connect Wallet</button>


      <Web3Context.Provider value={{web3State,handleWallet}}>

        {children}
      </Web3Context.Provider>
      
    </>
  )
}
export default Web3Provider;
