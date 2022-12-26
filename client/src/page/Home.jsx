import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomButton, PageHOC } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {
  const { contract, walletAddress, setShowAlert, setErrorMessage } = useGlobalContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.createGame();

        setShowAlert({
          status: true,
          type: 'info',
          message: `Creating the board!`,
        });

        setTimeout(() => navigate('/monopoly'), 2000);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };



  const handleClick2 = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        setShowAlert({
          status: true,
          type: 'info',
          message: `Loading the board!`,
        });

        setTimeout(() => navigate('/monopoly'), 2000);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };





  return (
    walletAddress && (
      <div className="flex flex-row gap-5">
        

        <CustomButton
          title="Start"
          handleClick={handleClick}
          restStyles="mt-6"
        />
        <CustomButton
          title="Load"
          handleClick={handleClick2}
          restStyles="mt-6"
        />
      </div>
    )
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to 0xMonopoly,  <br /> 
  </>,
  <>
    Connect your wallet to start playing <br /> this version of monopoly
  </>,
);
