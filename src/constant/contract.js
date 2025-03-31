import { ethers } from "ethers";
import abi from "../abi.json";
import { contractAddress } from "../constants"; 

export const getContract = async (signer) => {
  return new ethers.Contract(contractAddress, abi, signer);
};