import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const WalletBalance = () => {
    const [balance, setBalance] = useState("0");

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
    }, []);

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    }

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        if(accounts.length === 0){
            window.alert("No account detected, please install or sign into MetaMask.");
            return;
        }
        const balanceInWei = await web3.eth.getBalance(accounts[0]);
        const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
        setBalance(balanceInEth);
    }

    return (
        <div>
            <h1>MetaMask Wallet Balance</h1>
            <p>{balance} ETH</p>
        </div>
    )
}

export default WalletBalance;