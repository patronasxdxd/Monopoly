import React, {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';


import { Alert } from '../components';
import { useGlobalContext } from '../context';
import '../styles/monopoly.css';

const Monopoly = () => {
  const navigate = useNavigate();
  const { contract,player,setthrowAgain,setTreasure,treasure,throwAgain, setShowAlert,setPreviousPosition, showAlert,gameData,setPosistion,position } = useGlobalContext();

  const handle = async () => {
    try {
        if (throwAgain == true ){
            let player = localStorage.getItem('player');
            const playerExists = await contract.playRound(player);
            setPreviousPosition(await contract.currentPosition(player));

      
            setShowAlert({
                status: true,
                type: 'info',
                message: `Rolling Dices`,
            });
            setthrowAgain(false);

        }


    } catch (error) {
      console.log(error);
    }
  };


  const handle2 = async () => {
    try {

        let player = localStorage.getItem('player');
        const playerExists = await contract.buyOrUpgrade(player);

        
        setShowAlert({
            status: true,
            type: 'info',
            message: `buying house`,
        });


        } catch (error) {
      console.log(error);
    }
  };



  const handle3 = async () => {
    try {
            setShowAlert({
                status: true,
                type: 'info',
                message: `Ended turn`,
            });

            setthrowAgain(true);
            setTreasure(false);


            let turn = localStorage.getItem('player');
            let newTurn = +turn+1;

            if (newTurn > 3 ){
                newTurn =0;

                setShowAlert({
                    status: true,
                    type: 'info',
                    message: `new Round has started`,
                });
            }
            localStorage.setItem('player',newTurn);
            getPlayerInfo();
    } catch (error) {
      console.log(error);
    }
  };


  const getPlayerInfo = async () => {
    try {
      let player1Position = await contract.currentPosition(0)
      let player2Position = await contract.currentPosition(1)
      let player3Position = await contract.currentPosition(2)
      let player4Position = await contract.currentPosition(3)

      let player1Money = (await contract.getMoney(0)).toNumber();
      let player2Money = (await contract.getMoney(1)).toNumber();
      let player3Money = (await contract.getMoney(2)).toNumber();
      let player4Money = (await contract.getMoney(3)).toNumber();

      var e = document.getElementById(player1Position);
      e.innerHTML = "";
      var e = document.getElementById(player2Position);
      e.innerHTML = "";
      var e = document.getElementById(player3Position);
      e.innerHTML = "";
      var e = document.getElementById(player4Position);
      e.innerHTML = "";



      const streets = ["Go", "Mediterranean Avenue", "Chance", "Baltic Avenue", "Chance", "Reading Railroad", "Mediterranean Avenue"
      , "Chance", "Oriental Avenue", "Vermont Avenu", "In Jail / Just Visiting", "St. Charles Place", "Chance", "States Avenue"
      , "Virginia Avenue", "ennsylvania Railroad", "St. James Place", "Community Chest", "Tennessee Avenue", "Kentucky Avenue","Free Parking"
      , "Vermont Avenu",  "Chance"
      , "Marvin Garden", "Vermont Avenu", "Eastern Avenue", "Indiana Avenue"
      , "London", "Chance", "Ohio", "Go to Prison", "Marvin Garden", "Station south", "Community Chest","Makati", "Community Chest", "Bonifacio",
      "Pasay","Chance","Tagatay"];
  


      for (let i = 0; i < streets.length; i++) {
        document.getElementById(i).innerText = streets[i];
      }

      var div = document.createElement("div");
      document.getElementById(player1Position).
      appendChild(div);
      div.style.cssText= 'font-size: 18px;';
      div.innerHTML = "P1"

      var div = document.createElement("div");
      document.getElementById(player2Position).
      appendChild(div);
      div.style.cssText= 'font-size: 18px;';
      div.innerHTML = "P2"

      var div = document.createElement("div");
      document.getElementById(player3Position).
      appendChild(div);
      div.style.cssText= 'font-size: 18px;';
      div.innerHTML = "P3"

      var div = document.createElement("div");
      document.getElementById(player4Position).
      appendChild(div);
      div.style.cssText= 'font-size: 18px;';
      div.innerHTML = "P4"

      document.getElementById("currentPlayer").innerText = "currentPlayer: player "+ (+localStorage.getItem('player')+1); 
      document.getElementById("player1Money").innerText = "player1: "+ player1Money+"$";
      document.getElementById("player2Money").innerText = "player2: "+ player2Money+"$";
      document.getElementById("player3Money").innerText = "player3: "+ player3Money+"$";
      document.getElementById("player4Money").innerText = "player4: "+ player4Money +"$";
      setPosistion(await contract.currentPosition(player));

    } catch (error) {
      console.log(error);}
  };


  const createTreasuree = async () => {
    try {
        if(treasure == false ){
        let player = localStorage.getItem('player');
        let position = (await contract.currentPosition(player)).toNumber();

        if ( position == 2 || position == 4 
            || position == 7  || position == 12  || position == 17 
            || position == 22  || position == 28  || position == 33
            || position == 36  || position == 38  ){
        let player = localStorage.getItem('player');
        
        await contract.createTreasure(player);
            }

        }

    }catch (error) {
        console.log(error);
    }
    };

useEffect(() =>{
    getPlayerInfo();
}, [localStorage.getItem('player')]);




useEffect(() => {
    getPlayerInfo();
    createTreasuree(player)
  }, [gameData]);






  getPlayerInfo
  return (
    <div className='' >
        
{showAlert?.status && <Alert type={showAlert.type} message={showAlert.message} />}

<div className='flex column flex-auto'>

    <div className='flex-auto m-20 text-2xl'>

    <div className="bg-gray-500 text-white font-bold py-2 px-4 border border-blue-700 rounded" id="currentPlayer"></div>

<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handle}>Roll</button>
    <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handle2}>Buy or Upgrade</button>
    <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handle3}>end turn</button>

    </div>


    <div className='flex-auto'>
  <div className='flex row flex-auto m-2 text-2xl'>
    <div className="bg-green-500  text-white font-bold py-2 px-4 border border-blue-700 rounded" id="player1Money"></div>
    <div className="bg-green-500  text-white font-bold py-2 px-4 border border-blue-700 rounded" id="player2Money"></div>
    <div className="bg-green-500  text-white font-bold py-2 px-4 border border-blue-700 rounded" id="player3Money"></div>
    <div className="bg-green-500 text-white font-bold py-2 px-4 border border-blue-700 rounded" id="player4Money"></div>

    </div>



    <div class="board" >
    <div class="spot bottom right corner"><span id='0' ></span></div>
    <div class="spot bottom prop" data-group="brown"><span id='1'>Mediterranean Avenue</span></div>
  <div  class="spot bottom"><span id='2'>Chance</span ></div>
  <div class="spot bottom prop" data-group="brown"><span id='3'>Baltic Avenue</span></div>
  <div  class="spot bottom"><span id='4'>Chance</span></div>
  <div  class="spot bottom"><span id='5'>Reading Railroad</span></div>
  <div  class="spot bottom prop" data-group="brown"><span id='6'>Mediterranean Avenue</span></div>
  <div class="spot bottom"><span id='7' >Chance</span></div>
  <div  class="spot bottom prop" data-group="lightblue"><span id='8'>Oriental Avenue</span></div>
  <div  class="spot bottom prop" data-group="lightblue"><span id='9'>Vermont Avenue</span></div>
  <div  class="spot left bottom corner"><span id='10'> In Jail / Just Visiting</span></div>
  <div  class="spot left prop" data-group="magenta"><span id='11'>St. Charles Place</span></div>
  <div  class="spot left"><span id='12'>Electric Company</span></div>
  <div class="spot left prop" data-group="magenta"><span id='13'>States Avenue</span></div>
  <div  class="spot left prop" data-group="magenta"><span id='14'>Virginia Avenue</span></div>
  <div  class="spot left"><span id='15'>Pennsylvania Railroad</span></div>
  <div  class="spot left prop" data-group="orange"><span id='16'>St. James Place</span></div>
  <div  class="spot left"><span id='17'>Community Chest</span></div>
  <div  class="spot left prop" data-group="orange"><span id='18'>Tennessee Avenue</span></div>
  <div  class="spot left prop" data-group="orange"><span id='19'>New York Avenue</span></div>
  <div  class="spot top left corner"><span id='20'>Free Parking</span></div>
  <div  class="spot top prop" data-group="red"><span id='21'>Kentucky Avenue</span></div>
  <div  class="spot top"><span id='22' >Chance</span></div>
  <div class="spot top prop" data-group="red"><span id='23' >Indiana Avenue</span></div>
  <div  class="spot top prop" data-group="red"><span id='24' >Illinois Avenue</span></div>
  <div  class="spot top"><span id='25' >B.B.Q. Railroad</span></div>
  <div  class="spot top prop" data-group="yellow"><span id='26' >Atlantic Avenue</span></div>
  <div  class="spot top prop" data-group="yellow"><span id='27' >Ventnor Avenue</span></div>
  <div  class="spot top"><span id='28' >Water Works</span></div>
  <div  class="spot top prop" data-group="yellow"><span id='29' >Marvin Gardens</span></div>
  <div  class="spot right top corner"><span  id='30' >Go To Jail</span></div>
  <div  class="spot right prop" data-group="green"><span id='31' >Pacific Avenue</span></div>
  <div  class="spot right prop" data-group="green"><span id='32' >North Carolina Avenue</span></div>
  <div id='32' class="spot right"><span id='33' >Community Chest</span></div>
  <div id='33' class="spot right prop" data-group="green"><span id='34' ></span></div>
  <div id='34' class="spot right"><span id='35' ></span></div>
  <div id='35' class="spot right"><span id='36' ></span></div>
  <div id='36' class="spot right prop" data-group="blue"><span id='37' ></span></div>
  <div id='37' class="spot right"><span id='38' >Luxury Tax</span></div>
  <div id='38' class="spot right prop" data-group="blue"><span id='39' ></span></div>
  <div id='40'  class="center"></div>

  </div>
    </div>
</div> 
</div>
  );
};

export default Monopoly;
