import {ethers} from "ethers"
import abi from "../constant/abi.json"

export const getWeb3State = async()=>{
    try{
        //metamask installation check
        if(!window.ethereum){
            throw new Error("Metamask is not installed")
        }
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        }).catch((error) => {
            if (error.code === -32002) {
                console.error("A request to connect to MetaMask is already pending. Please check your MetaMask extension.");
                throw new Error("Pending request");
            }
            throw error;
        });

        const selectedAccount = accounts[0];

        const chainIdHex = await window.ethereum.request({
            method:'eth_chainId'
        })
        const chainId = parseInt(chainIdHex,16);
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contractAddress = "0xE0Ab2E8452aC484Bd2508B68211b4DA38cCD70E4";

        const contractInstance = new ethers.Contract(contractAddress,abi,signer)
        return {contractInstance,selectedAccount,chainId, signer, provider}
    }catch(error){
        console.error(error)
        throw new Error
    }
  
}
