//###Variables

/*---Start Screen---*/

//create start screen div
const startScreenDiv = document.createElement('div');
startScreenDiv.className = "screen screen-start";
startScreenDiv.id ='start';

//create header
const header = document.createElement('header');

//create title
let title = document.createElement('h1');
title.textContent = 'Tic Tac Toe';

//create player vs player button
const pvpButton = document.createElement('a');
pvpButton.setAttribute('class','button');
pvpButton.setAttribute('href', '#');
pvpButton.textContent = 'Player vs. Player';
pvpButton.style.margin = '5px';

//create player vs computer button
const playerVsComputerButton = document.createElement('a');
playerVsComputerButton.setAttribute('class','button');
playerVsComputerButton.setAttribute('href', '#');
playerVsComputerButton.textContent = 'Player vs. Computer';
playerVsComputerButton.style.margin = '5px';

//create user name input area
 let playerNameInput = document.createElement('input');
  playerNameInput.setAttribute('class','button');
  playerNameInput.style.marginTop = '5px';
//hide player name input
  playerNameInput.style.display = 'none';

//create name button to capture player name(s)
const nameButton = document.createElement('a')
nameButton.setAttribute('class','button');
nameButton.setAttribute('href', '#');
nameButton.textContent = 'Submit Player1 Name';
nameButton.style.marginLeft = '400px';
nameButton.style.marginRight = '400px';
nameButton.style.marginTop = '5px';
//hide name button
nameButton.style.display = 'none';

//append start page elements
header.appendChild(title);
header.appendChild(pvpButton);
header.appendChild(playerVsComputerButton);
header.appendChild(playerNameInput);
header.appendChild(nameButton);



startScreenDiv.appendChild(header);

/*---Board---*/
//select the box area
const boxArea = document.querySelector('.boxes');
//select the boxes on the board
let box = document.querySelectorAll('.box');

//create array of all possible win combinations
let winParameters = [
[box[0],box[1],box[2]],
[box[3],box[4],box[5]],
[box[6],box[7],box[8]],

[box[0],box[3],box[6]],
[box[1],box[4],box[7]],
[box[2],box[5],box[8]],

[box[0],box[4],box[8]],
[box[2],box[4],box[6]],
];

//create a random number to choose player 1
let randomNum = Math.floor(Math.random() * 2);

//create arrays to capture each players selections/move
let player1Selections = [];
let player2Selections = [];

//paragraph message for end game screen
const paragraphE = document.createElement('p');
  paragraphE.classList.add('message');

//index number of box
let boxIndexNum;

//##Functions

//create name div function
const createPlayerNameDiv = (playerTag, playerName) =>{
  let playerNameDiv = document.createElement('p');
  playerNameDiv.classList.add('name')
  playerNameDiv.textContent = playerName;
  playerTag.append(playerNameDiv);
};

//create player1 moves
 // if player1 is active and the selected box is empty - run code
 const player1Move = (e) => {
   if (player1.className === 'players active' && e.target.className === 'box'){
    //mark the user's selection by adding class for player 1
    e.target.classList.add('box-filled-1');
    //add player1's selection to player1's selection array
    player1Selections.push(e.target);
     //check to see if player one is the winner, show player 1 winner page if true
    showWinnner(player2, player1Selections);
    //check to see if the game is a tie, show tie page if true
    showTie(player1Selections);
    //switch player turn to player 2
    player2.classList.add('active');
    //remove the active class/turn from player 1
    player1.classList.remove('active');
  }
};

//player2 moves
const player2Move = (e) => {
if (player2.className === 'players active' && e.target.className === 'box'){
    //mark the user's selection by adding class for player 1
    e.target.classList.add('box-filled-2');
    //add player2's selection to player2's selection array
    player2Selections.push(e.target);
    //check to see if player 2 is the winner, show player 1 winner page if true
    showWinnner(player1, player2Selections);
    //check to see if the game is a tie, show tie page if true
    showTie(player2Selections);
    //switch player turn to player 1
    player1.classList.add('active');
    //remove the active class/turn from player 2
    player2.classList.remove('active');

  }
};
//program computer moves based on random number
let computerMoves = () => {
  do {
  boxIndexNum = Math.floor(Math.random() * 9);
   console.log(boxIndexNum);
  } while ((player2.className === 'players active' && box[boxIndexNum].className !== 'box') && (winner(winParameters, player1Selections)) !== true)
    if(player2.className === 'players active' && box[boxIndexNum].className === 'box'){
    //add player2's selection to player2's selection array
    box[boxIndexNum].classList.add('box-filled-2');
    player2Selections.push(box[boxIndexNum]);
    //check to see if player 2 is the winner, show player 1 winner page if true
    showWinnner(player1, player2Selections);
    //check to see if the game is a tie, show tie page if true
    showTie(player2Selections);
    //switch player turn to player 1
    player1.classList.add('active');
    //remove the active class/turn from player 2
    player2.classList.remove('active');
    }
};
/*---Game win parameters---*/

//compare win parameters array with the player selection array, return true if there is a match
const winner = (winParameters, playerSelections) => {
    for (let i =0; i <winParameters.length; i++) {
      if(winParameters[i].every(checkedBox => playerSelections.indexOf(checkedBox) != -1))
      return true;
  }
      return false;
 }

//create winner screen function
const createEndGameScreen = (winnerClassName) => {
const winnerScreenDiv = document.createElement('div');
winnerScreenDiv.id ='finish';
winnerScreenDiv.className = winnerClassName;

//create header
const header2 = document.createElement('header');

//create title
let title2 = document.createElement('h1');
title2.textContent = 'Tic Tac Toe';

if (player1.className === 'players active'){
//set text content of p element
  paragraphE.textContent = `${player1.children[1].textContent} is the Winner!`;
} else if(player2.className === 'players active') {
    paragraphE.textContent = `${player2.children[1].textContent} is the Winner!`;
}

//  else if (palyer2.className = '');
//    paragraphE.textContent = `Computer is the Winner!`;

//create new game button
const newGameButton = document.createElement('a');
newGameButton.setAttribute('class','button');
newGameButton.setAttribute('href', '#');
newGameButton.textContent = 'New game';
//add event listener to new game button to reset game
newGameButton.onclick = () => {
  window.location.reload(true);
}

//append winner screen elements to page
header2.append(title2);
header2.appendChild(paragraphE);
header2.appendChild(newGameButton);
winnerScreenDiv.appendChild(header2);
document.querySelector('body').append(winnerScreenDiv);
};

//show winner function
const showWinnner = (player, playerSelections) => {
  //
  if (winner(winParameters, player1Selections) === true) {
  //hide the board
  board.style.display = 'none';
  //show player  win page
  createEndGameScreen('screen screen-win screen-win-one');
  } else if (winner(winParameters, player2Selections) === true) {
  //hide the board
  board.style.display = 'none';
  //show player 2 win page
  createEndGameScreen('screen screen-win screen-win-two');
  }
}

//showTie function
const showTie = (playerSelections) => {
  if ((playerSelections.length === 5) && (board.style.display === 'block')) {
    //hide the board
  board.style.display = 'none';
  //show player tie screen
  createEndGameScreen('screen screen-win screen-win-tie');
  //set text content of p element
  paragraphE.textContent = 'It\'s a Tie!';
  }
}

//###Function calls

/*---Start Screen---*/

//hide the board
board.style.display = 'none';

//append the start screen to the page
document.querySelector('body').append(startScreenDiv);

//add event listener on pvp button to hide start screen and display the board game
pvpButton.onclick = () => {
  pvpButton.style.display = 'none';
  playerVsComputerButton.style.display = 'none';
  playerNameInput.style.display = 'inline';
  nameButton.style.display= 'block';
  createPlayerNameDiv(player2, '');

  if (randomNum === 0) {
  player2.classList.add("active");
  } else {
  player1.classList.add("active");
  }
//add an event listener to the boxArea
boxArea.onclick = (e) => {
  player1Move(e);
  player2Move(e);
  }
};
//add event listner on player vs computer button
playerVsComputerButton.onclick = () =>{
  pvpButton.style.display = 'none';
  playerVsComputerButton.style.display = 'none';
  playerNameInput.style.display = 'inline';
  nameButton.style.display= 'block';
  createPlayerNameDiv(player2, 'Computer');

  if(playerNameInput.value !== '' && nameButton.textContent === 'Submit Player1 Name' ){
   let playerName = playerNameInput.value;
   //get players name
  createPlayerNameDiv(player1, playerName);
  playerNameInput.value = '';
  startScreenDiv.style.display = 'none';
  board.style.display = 'block';
 }
  if (randomNum === 0) {
  player2.classList.add("active");
  computerMoves();
  } else {
  player1.classList.add("active");
   }
  boxArea.onclick = (e) => {
  player1Move(e);
  computerMoves(e);
  }
};

//add event listener to name buttons to capture player names
nameButton.onclick = (e) =>{
  //check if player1 name field is blank; if not, append player name
 if(playerNameInput.value !== '' && nameButton.textContent === 'Submit Player1 Name' ){
   let playerName = playerNameInput.value;
   //get players name
  createPlayerNameDiv(player1, playerName);
  playerNameInput.value = '';
    //ask for player 2's name
if(player2.children[1].textContent !== 'Computer'){
  nameButton.textContent = 'Please Submit Player2 Name';
  } else{
      startScreenDiv.style.display = 'none';
  board.style.display = 'block';
  }
 }
   if( playerNameInput.value !== '' && nameButton.textContent === 'Please Submit Player2 Name' ){
player2.children[1].textContent = playerNameInput.value;
//hide the start creen and show the game board
  startScreenDiv.style.display = 'none';
  board.style.display = 'block';
 }
 };
//create mouseover on the box area
boxArea.onmouseover = (e) => {
  //add highlighted area over box
  if (e.target.className === 'box box-filled-1' || e.target.className === 'box box-filled-2'){
  return
  };
  if (player1.className === 'players active') {
    e.target.style.backgroundImage = 'url("../img/o.svg")';
  }else{
     e.target.style.backgroundImage = 'url("../img/x.svg")';
  }
  //reset the highlighted box
setTimeout(function() {
  e.target.style.backgroundImage = '';
  }, 500);
}
