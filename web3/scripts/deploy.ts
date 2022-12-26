import { ethers } from 'hardhat';
import console from 'console';
import {Monopoly} from '../contracts/Monopoly.sol'



async function main() {
  const [admin,secondPLayer] = await ethers.getSigners();
  
  console.log(`Deploying a monopoly...`);


  const Game = await ethers.getContractFactory("Monopoly");
  const game = await Game.deploy();
  await game.deployed();
  console.log("token deployed:", game.address);

  const monopoly = (await ethers.getContractAt(
        "Monopoly",
        game.address
      )) as Monopoly;


  // const createBoard = await monopoly.createGame();

  


  // // const getBoard = await monopoly.getBoard();
  // // console.log(getBoard);

  // console.log("current tile:")
  // const currentTile = await monopoly.currentTile(0);
  // console.log(currentTile);


  // const currentPosistion = await monopoly.currentPosition(0);
  // console.log(currentPosistion);


  // const Play = await monopoly.playRound(0);
  // console.log(await monopoly.currentPosition(0),'1');
  //   const Play2 = await monopoly.playRound(0);
  //   console.log(await monopoly.currentPosition(0),'2');
  //   const Play3 = await monopoly.playRound(0);
  //   console.log(await monopoly.currentPosition(0),'3');

  //   const Play4 = await monopoly.playRound(0);

  //   const buy = await monopoly.buyOrUpgrade(0);
  //   const buy2 = await monopoly.buyOrUpgrade(0);

  //   // const buy2 = await monopoly.buyOrUpgrade("dwa");

  //   buy.wait(1);
  //   console.log("here");
  //   console.log(await monopoly.currentTile(0));

  //   console.log(await monopoly.currentPosition(0));




  // console.log(await monopoly.getMoney(0));

  // console.log(await monopoly.currentPosition(0));

  // console.log(await monopoly.getMoney(0),'xd66');

  // await monopoly.createTreasure(0);

  // await monopoly.createTreasure(1);
  // await monopoly.createTreasure(2);
  // console.log(await monopoly.currentPosition(0),'xd6');
  // console.log(await monopoly.getMoney(2),'xd4');



  // await monopoly.playRound(1);
  // await monopoly.playRound(2);
  // await monopoly.playRound(3);
  // await monopoly.playRound(3);


  
  // console.log(await monopoly.currentPosition(1));
  // console.log(await monopoly.getMoney(0),'xd2');
  // console.log(await monopoly.getMoney(1),'xd');
  // console.log(await monopoly.getMoney(3));


}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  });
