import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [web3State, setWeb3State] = useState({
        selectedAccount: null,
        chainId: null,
    });

    useEffect(() => {
        const fetchAccounts = async () => {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                setWeb3State((prevState) => ({ ...prevState, selectedAccount: accounts[0] }));
            }
        };

        fetchAccounts();
    }, []);

    return (
        <Web3Context.Provider value={{ web3State, setWeb3State }}>
            {children}
        </Web3Context.Provider>
    );
};
