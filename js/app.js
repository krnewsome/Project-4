//###Variables

/*---Start Screen---*/

//players names
let player1Name = prompt('Please Enter Player 1\'s Name');
let player2Name = prompt('Please Enter Player 2\'s Name');

//create start screen div
const startScreenDiv = document.createElement('div');
startScreenDiv.className = "screen screen-start";
startScreenDiv.id ='start';

//create header
const header = document.createElement('header');

//create title
let title = document.createElement('h1');
title.textContent = 'Tic Tac Toe';

//create button
const button = document.createElement('a');
button.setAttribute('class','button');
button.setAttribute('href', '#');
button.textContent = 'Start game';

//append start page elements
header.appendChild(title);
header.appendChild(button);
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

let boxIndexNum;

//##Functions

//create name div function
const createPlayerNameDiv = (playerTag, playerName) =>{
  let playerNameDiv = document.createElement('p');
  playerNameDiv.classList.add('name')
  playerNameDiv.textContent = playerName;
  playerTag.append(playerNameDiv);
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

//set text content of p element
  paragraphE.textContent = 'Winner';

//create button
const button2 = document.createElement('a');
button2.setAttribute('class','button');
button2.setAttribute('href', '#');
button2.textContent = 'New game';
//add event listener to new game button to reset game
button2.onclick = () => {
  window.location.reload(true);
}

//append winner screen elements to page
header2.append(title2);
header2.appendChild(paragraphE);
header2.appendChild(button2);
winnerScreenDiv.appendChild(header2);
document.querySelector('body').append(winnerScreenDiv);
};

//show winner function
const showWinnner = (player, playerSelections) => {
  //
  if (winner(winParameters, player1Selections) === true) {
  //hide the board
  board.style.display = 'none';
  //show player 1 win page
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
    //switch player turn to player 1
    player1.classList.add('active');
    //remove the active class/turn from player 2
    player2.classList.remove('active');
    //check to see if player 2 is the winner, show player 1 winner page if true
    showWinnner(player1, player2Selections);
    //check to see if the game is a tie, show tie page if true
    showTie(player2Selections);
    }
}
//###Function calls

/*---Start Screen---*/

//hide the board
board.style.display = 'none';

//append the start screen to the page
document.querySelector('body').append(startScreenDiv);

//add event listener on start game button to hide start screen and display the board game
button.onclick = () => {
  startScreenDiv.style.display = 'none';
  board.style.display = 'block';
  createPlayerNameDiv (player1, player1Name);
  createPlayerNameDiv (player2, player2Name);
  if (randomNum === 0) {
  player2.classList.add("active");
  } else {
  player1.classList.add("active");
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

// add an event listener to the boxArea
boxArea.onclick = (e) => {
  // if player1 is active and the selected box is empty - run code
  if (player1.className === 'players active' && e.target.className === 'box'){
    //mark the user's selection by adding class for player 1
    e.target.classList.add('box-filled-1');
    //add player1's selection to player1's selection array
    player1Selections.push(e.target);
    //switch player turn to player 2
    player2.classList.add('active');
    //remove the active class/turn from player 1
    player1.classList.remove('active');
    //check to see if player one is the winner, show player 1 winner page if true
    showWinnner(player2, player1Selections);
    //check to see if the game is a tie, show tie page if true
    showTie(player1Selections);
  }
//  if (player2.className === 'players active' && e.target.className === 'box'){
//    //mark the user's selection by adding class for player 1
//    e.target.classList.add('box-filled-2');
//    //add player2's selection to player2's selection array
//    player2Selections.push(e.target);
//    //switch player turn to player 1
//    player1.classList.add('active');
//    //remove the active class/turn from player 2
//    player2.classList.remove('active');
//    //check to see if player 2 is the winner, show player 1 winner page if true
//    showWinnner(player1, player2Selections);
//    //check to see if the game is a tie, show tie page if true
//    showTie(player2Selections);
//  }
      computerMoves();

  }
