import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';

import { GetParams } from '../utils/onboard.js';
import { ABI, ADDRESS } from '../contract';
import { createEventListeners } from './createEventListeners';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [battleGround, setBattleGround] = useState('bg-astral');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [step, setStep] = useState(1);
  const [gameData, setGameData] = useState({ players: [], pendingBattles: [], activeBattle: null });
  const [showAlert, setShowAlert] = useState({ status: false, type: 'info', message: '' });
  const [battleName, setBattleName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [updateGameData, setUpdateGameData] = useState(0);
  const [outfit, setOutfit] = useState('bg-1')
  const [played, setPlayed] = useState(false);
  const [update, setUpdate] = useState(0);
  const [total,setTotal] = useState(0);
  const [count,setCount] = useState(0);
  const [Dice,setDice] = useState([]);
  const [previousPosition, setPreviousPosition] = useState(0);
  const [houses, setHouses] = useState([]);
  const [player, setPlayer] = useState(0);
  const [position,setPosistion] = useState(0);
  const [throwAgain,setthrowAgain] = useState(true);
  const [treasure,setTreasure] = useState(false);


  const player1Ref = useRef();
  const player2Ref = useRef();

  const navigate = useNavigate();

  //* Set battleground to local storage
  useEffect(() => {
    const isBattleground = localStorage.getItem('battleground');

    if (isBattleground) {
      setBattleGround(isBattleground);
    } else {
      localStorage.setItem('battleground', battleGround);
    }
  }, []);


  useEffect(() => {
    const isOutfit= localStorage.getItem('outfit');

    if (isOutfit) {
      setOutfit(isOutfit);
    } else {
      localStorage.setItem('outfit', outfit);
    }
  }, []);



  useEffect(() => {
    const resetParams = async () => {
      const currentStep = await GetParams();

      setStep(currentStep.step);
    };

    resetParams();

    window?.ethereum?.on('chainChanged', () => resetParams());
    window?.ethereum?.on('accountsChanged', () => resetParams());
  }, []);

  //* Set the wallet address to the state
  const updateCurrentWalletAddress = async () => {
    const accounts = await window?.ethereum?.request({ method: 'eth_accounts' });

  
    if (accounts) setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    updateCurrentWalletAddress();

    window?.ethereum?.on('accountsChanged', updateCurrentWalletAddress);
  }, []);

  //* Set the smart contract and provider to the state
  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = newProvider.getSigner();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);

      setProvider(newProvider);
      setContract(newContract);
    };

    setSmartContractAndProvider();
  }, []);

  

  //* Activate event listeners for the smart contract
  useEffect(() => {
    if (step === -1 && contract) {
      createEventListeners({
        navigate,
        contract,
        provider,
        walletAddress,
        setShowAlert,
        player1Ref,
        player2Ref,
        setUpdateGameData,
        updateGameData,
        setPlayed,
        total,
        setTotal,setDice,
        setHouses,
        position,
        setthrowAgain,
        setTreasure
        ,
        player
      });
    }
  }, [step]);

  //* Set the game data to the state
  useEffect(() => {
    const fetchGameData = async () => {
      if (contract) {

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ADDRESS, ABI, signer);


        console.log("Here!")
        

        setGameData(count);

        setCount(count+1);

        
       
      
        // const fetchedBattles = await contract.getBoard();
        
        // fetchedBattles.forEach((board) => {

          

        //   if (board.players.find((player) => player.toLowerCase() === walletAddress.toLowerCase())) {

           
           
        //    if(battle.battleStatus === 1){
        //     if (battle.moves[0] === 0 && battle.moves[1] === 0) {
          
        //       setPlayed(false);
        //       console.log("new round!");
        //     }
            
        //   }
        // }
        // });


        // const pendingBattles = fetchedBattles.filter((battle) => battle.battleStatus === 0);
        // let activeBattle = null;



        // fetchedBattles.forEach((battle) => {
        //   if (battle.players.find((player) => player.toLowerCase() === walletAddress.toLowerCase())) {
        //     if (battle.winner.startsWith('0x00')) {
        //       activeBattle = battle;
        //     }
        //   }
        // });

        

        

        // setGameData({ pendingBattles: pendingBattles.slice(1), activeBattle });
      }
    };

    fetchGameData();

  }, [contract, updateGameData]);

  //* Handle alerts
  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: 'info', message: '' });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  //* Handle error messages
  useEffect(() => {
    if (errorMessage) {
      const parsedErrorMessage = errorMessage?.reason?.slice('execution reverted: '.length).slice(0, -1);

      if (parsedErrorMessage) {
        setShowAlert({
          status: true,
          type: 'failure',
          message: parsedErrorMessage,
        });
      }
    }
  }, [errorMessage]);

  return (
    <GlobalContext.Provider
      value={{
        player1Ref,
        player2Ref,
        battleGround,
        setBattleGround,
        contract,
        gameData,
        walletAddress,
        updateCurrentWalletAddress,
        showAlert,
        setShowAlert,
        battleName,
        setBattleName,
        errorMessage,
        setOutfit,
        setErrorMessage,
        outfit,
        played,
        update,
        setPlayed,
        setUpdate,
        Dice,
        previousPosition,
        setPreviousPosition
        ,houses,
        player,
        setPlayer,
        position,
        setPosistion,
        throwAgain,
        setthrowAgain,
        treasure,
        setTreasure
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
