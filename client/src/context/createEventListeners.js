import { ethers } from 'ethers';

import { ABI } from '../contract';




const AddNewEvent = (eventFilter, provider, cb) => {
  provider.removeListener(eventFilter);

  provider.on(eventFilter, (logs) => {
    const parsedLog = (new ethers.utils.Interface(ABI)).parseLog(logs);

    cb(parsedLog);
  });
};




//* Get battle card coordinates
const getCoords = (cardRef) => {
  const { left, top, width, height } = cardRef.current.getBoundingClientRect();

  return {
    pageX: left + width / 2,
    pageY: top + height / 2.25,
  };
};

const emptyAccount = '0x0000000000000000000000000000000000000000';

export const createEventListeners = ({ setthrowAgain,posistion,setTreasure,navigate, contract, provider, walletAddress, setShowAlert, player1Ref, player2Ref, setUpdateGameData,updateGameData,setPlayed,prevUpdateGameData,setTotal,total,setDice,setHouses,player }) => {



  const newTreasureEvent = contract.filters.TreasureEvent();
  AddNewEvent(newTreasureEvent, provider, ({ args }) => {
    console.log('New treasure created!', args);
    
      setShowAlert({
        status: true,
        type: 'success',
        message: 'player' + +args.player+1 + ', drawn a treasure ' + args.str,
      });



      
      setTreasure(true);
      setUpdateGameData((updateGameData) => updateGameData + 1);
    
  });

  const newPayEvent = contract.filters.Pay();
  AddNewEvent(newPayEvent, provider, ({ args }) => {
    console.log('New payment created!', args);

      setShowAlert({
        status: true,
        type: 'success',
        message: 'you successfully payed ' + args.amount + '$ to player ' + args.receiver,
      });
    
  });


  const newRoundEvent = contract.filters.roundCreated();
  AddNewEvent(newRoundEvent, provider, ({ args }) => {
    console.log('New Round!', args);


    
      setShowAlert({
        status: true,
        type: 'success',
        message: 'you rolled' + args.dice1 + ' and ' + args.dice2,
      });

      console.log(args.dice1)
      console.log(args.dice2)
      console.log((args.dice1).toNumber() == (args.dice2).toNumber())


      if ((args.dice1).toNumber() == (args.dice2).toNumber()){
        setShowAlert({
          status: true,
          type: 'success',
          message: 'you rolled double please throw again!',
        });
        setthrowAgain(true);

      }

  
      setUpdateGameData((updateGameData) => updateGameData + 1);
    
    
  });


  const newBoughtEvent = contract.filters.Bought();
  AddNewEvent(newBoughtEvent, provider, ({ args }) => {
    console.log('Bought house', args);

    console.log(localStorage.getItem('player'));


      setShowAlert({
        status: true,
        type: 'success',
        message: 'player ' + +args.player+1 +' has successfully bought a house at tile' + args.Posistion,

      });


      console.log(player);
      
      setHouses([posistion]);
      setUpdateGameData((updateGameData) => updateGameData + 1);

    
  });

  const newUpgraded = contract.filters.Upgraded();
  AddNewEvent(newUpgraded, provider, ({ args }) => {
    console.log('upgraded the house', args);


    // console.log(localStorage.getItem('player'));
  

      setShowAlert({
        status: true,
        type: 'success',
        message: 'player ' + +args.player+1 +' has successfully upgraded a house on tile ' + args.Posistion,
      });

      console.log('playerxdd' + player);
      
  
      setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);

    
  });


  const CreateGame = contract.filters.CreateGame();
  AddNewEvent(CreateGame, provider, ({ args }) => {
    console.log('createdGame', args);
    localStorage.setItem('player',0);
      setShowAlert({
        status: true,
        type: 'success',
        message: 'succesfully created the game',
      });
    
  });
  
};
