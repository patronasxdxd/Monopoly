// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract Monopoly {

    enum gameStatus{ PENDING, STARTED, ENDED }
    enum tileState{ STREET,TAXES, EVENT,STATION, TREASURE,START }

    address owner;
    uint nonce;

    constructor() public {
        owner = msg.sender;
    }

    struct Tiles{
        
        bool isOccupied;
        uint256 value;
        uint256 upgrades;
        tileState state;
        uint256 player;
    }

    struct Board {
    Tiles[] tiles;
    }

    struct Player {
        uint256 playerNumber;
        uint256 playerMoney;
        uint256 position;
    }

    struct Game {
        Board board;
        gameStatus gamestatus;
        address winner;
        Player[4] players;
    }

    struct Round {
        uint8 move;
    }


 mapping(address => uint256) public playerInfo;
//  mapping (address => uint256) public gameInfo;
 mapping (address => Player) public players;
 mapping (address => Game) public games;

 // mapping(address => Board ) public board;


//monopoly with 4 players
// Player[] public players;


Round[] public rounds;








//rollDice
  function _createRandomNum( ) internal returns (uint256 randomValue) {
    uint256 randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender,nonce)));

    nonce++;
    randomValue = randomNum % 6;
    if(randomValue == 0) {
      randomValue = 6 / 2;
    }

    return randomValue;
  }


   function isPlayer(address addr) public view returns (bool) {
    if(playerInfo[addr] == 0) {
      return false;
    } else {
      return true;
    }
  }



  function createGame () external {
     require (!isPlayer(msg.sender),"game already started");

    games[msg.sender].gamestatus = gameStatus.PENDING;



    games[msg.sender].gamestatus = gameStatus.STARTED;



    for (uint i=0; i < 4; i++) {
        games[msg.sender].players[i].playerMoney = 40000;
        games[msg.sender].players[i].position = 0;
        games[msg.sender].players[i].playerNumber = i;

    }
    
    // games[msg.sender].players[0].playerAddress = msg.sender;
    createBoard();

    emit CreateGame("game created");  
}


function getMoney(uint count) public view returns (uint256) {
    return games[msg.sender].players[count].playerMoney;
}


function calcState(uint256 number) internal returns (tileState) {
    if (number == 0) { return tileState.START;}
        else if (number == 2 || number == 7 || number == 17 || number == 33 || number == 22 || number ==36 ) { return tileState.TREASURE;}
           else if (number == 4 || number == 38) { return tileState.TAXES;}
                else if (number % 5 == 0 &&  number % 10 != 0) { return tileState.STATION;}
                    else if (number % 10 == 0) { return tileState.EVENT;}
                        else {return tileState.STREET; }
}

function createBoard() internal {
for(uint i=0; i<=40; i++) {
    games[msg.sender].board.tiles.push(Tiles(false,(i+1)*10,0,calcState(i),666));}
}

function getBoard() public view returns (Board memory) {
    // require(boa(_name), "Battle doesn't exist!");
    return games[msg.sender].board;
  }

function getPlayer(uint count) public view returns (Player memory) {
    // require(boa(_name), "Battle doesn't exist!");
    return games[msg.sender].players[count];
}

function getGame() public view returns (Game memory){
    return games[msg.sender];
}


function currentPosition(uint count) public view returns (uint256 ) {
    return games[msg.sender].players[count].position;
}

function currentTile(uint count) public view returns (Tiles memory) {
    return games[msg.sender].board.tiles[currentPosition(count)];
}

function playRound(uint count) external {
    Board memory _board = games[msg.sender].board;
    uint256 dice1 = _createRandomNum();
    uint256 dice2 = _createRandomNum();
    uint256 diceRolls = dice1 + dice2;

    if (currentPosition(count) + diceRolls >= 40) {
        games[msg.sender].players[count].position = ( (games[msg.sender].players[count].position  + diceRolls) - 40);
        games[msg.sender].players[count].playerMoney += 20000;

    }else{
    games[msg.sender].players[count].position += diceRolls;
    }

    if (games[msg.sender].board.tiles[currentPosition(count)].isOccupied == true &&
    games[msg.sender].board.tiles[currentPosition(count)].player != games[msg.sender].players[count].playerNumber &&
    games[msg.sender].board.tiles[currentPosition(count)].state == tileState.STREET
    ){
      games[msg.sender].players[count].playerMoney -= games[msg.sender].board.tiles[currentPosition(count)].value;

      emit Pay(games[msg.sender].board.tiles[currentPosition(count)].value , games[msg.sender].board.tiles[currentPosition(count)].player);
    }


    emit roundCreated(dice1,dice2);
}

function buyOrUpgrade(uint count) external {
    require(games[msg.sender].gamestatus == gameStatus.STARTED,"started");
    require(games[msg.sender].gamestatus != gameStatus.ENDED,"ended");
    require(games[msg.sender].board.tiles[currentPosition(count)].state == tileState.STREET,"No street");
    require(games[msg.sender].board.tiles[currentPosition(count)].player == 666 || games[msg.sender].board.tiles[currentPosition(count)].player == games[msg.sender].players[count].playerNumber,"not yours");
    require(games[msg.sender].players[count].playerMoney >= games[msg.sender].board.tiles[currentPosition(count)].value );

    if (games[msg.sender].board.tiles[currentPosition(count)].isOccupied == true && games[msg.sender].board.tiles[currentPosition(count)].upgrades != 5) {
        games[msg.sender].board.tiles[currentPosition(count)].value += (games[msg.sender].board.tiles[currentPosition(count)].value);
       games[msg.sender].board.tiles[currentPosition(count)].upgrades  += 1;
       emit Upgraded(count,games[msg.sender].players[count].position);

    }else{
          games[msg.sender].board.tiles[currentPosition(count)].isOccupied = true;
         games[msg.sender].board.tiles[currentPosition(count)].player = games[msg.sender].players[count].playerNumber;
         emit Bought(count,games[msg.sender].players[count].position);
    }
     games[msg.sender].players[count].playerMoney -= games[msg.sender].board.tiles[currentPosition(count)].value;

     
}


function createTreasure(uint count) external {

    uint256 number = _createRandomNum();

  
    if (number == 1){
     
        games[msg.sender].players[count].playerMoney += 20000;
        emit TreasureEvent("You won 20.000$",count);
    }
     if (number == 2){
        games[msg.sender].players[count].position = 0;
        games[msg.sender].players[count].playerMoney += 20000;
        emit TreasureEvent("Go back to start",count);

    }
    if (number ==3 ){
        for(uint i=0; i<=40; i++) {
           games[msg.sender].players[count].playerMoney -= (games[msg.sender].board.tiles[i].upgrades)*2500;
        }
        emit TreasureEvent("Repair your houses, 2500/house",count);
    }
     if (number ==4 ){
        
        games[msg.sender].players[count].playerMoney -= 15000;
        
        emit TreasureEvent("Pay school tuition of 15.000$",count);
    }
     if (number == 5 ){
        
        games[msg.sender].players[count].playerMoney += 10000;
        
        emit TreasureEvent("You won 10.000$",count);
    }
    if (number ==6 ){
        for(uint i=0; i<=40; i++) {
           games[msg.sender].players[count].playerMoney += (games[msg.sender].board.tiles[i].upgrades)*4000;
        }
        emit TreasureEvent("You gain 4000$ /house",count);
    }






}

event Event(uint256 str);
event TreasureEvent(string indexed str, uint256 indexed player);
event Pay( uint256 indexed amount, uint256 indexed receiver );
event roundCreated(uint256 indexed dice1,uint256 indexed dice2);
event Bought(uint256 indexed player, uint256 indexed Posistion);
event Upgraded(uint256 indexed player, uint256 indexed Posistion);
event CreateGame(string str);

}

