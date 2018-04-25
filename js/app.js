//###Variables
let box = document.querySelectorAll('.box');

/*Start Screen*/

//create start screen
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

//select and hide the board
const board = document.querySelector('#board');
board.style.display = 'none';

//append the start screen to the page
document.querySelector('body').append(startScreenDiv);

//add event listener on button to hide start screen and display the board game
let randomNum = Math.floor(Math.random() * 2);
button.onclick = () => {
  startScreenDiv.style.display = 'none';
  board.style.display = 'block';
  if (randomNum === 0) {
  player2.classList.add("active");
  } else {
  player1.classList.add("active");
  }
};

//alternate between the x's and o's
let player1Selections = [];
let player2Selections = [];
boxArea = document.querySelector('.boxes');
boxArea.onclick = (e) => {
  if (player1.className === 'players active'){
    e.target.classList.add('box-filled-1');
    player1Selections.push(e.target);
    player2.classList.add('active');
    player1.classList.remove('active');
    showWinnner(player2, player1Selections);

  }else {
    e.target.classList.add('box-filled-2');
    player2Selections.push(e.target);
    player1.classList.add('active');
    player2.classList.remove('active');
    showWinnner(player1, player2Selections);


  }

  }

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
//##Functions
/*Game win parameters*/
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

  //compare win parameters array with the player selection array, return true if there is a match
 const winner = (winParameters, playerSelections) => {
    for (let i =0; i <winParameters.length; i++) {
      if(winParameters[i].every(checkedBox => playerSelections.indexOf(checkedBox) != -1))
      return true;
  }
      return false;}


//show winner function
const showWinnner = (player, playerSelections) => {
  if (player.className === 'players active' && winner(winParameters, playerSelections) === true) {
  board.style.display = 'none';

  }
}

//create winner screen
const createWinnerScreen = () => {
const winnerScreenDiv = document.createElement('div');
winnerScreenDiv.id ='finish';
winnerScreenDiv.className ='screen screen-win screen-win-two';


//create header
const header2 = document.createElement('header');

//create title
let title2 = document.createElement('h1');
title2.textContent = 'Tic Tac Toe';

//create p element
const paragraphE = document.createElement('p');
  paragraphE.classList.add('message');
  paragraphE.textContent = 'Winner';
//create button
const button2 = document.createElement('a');
button2.setAttribute('class','button');
button2.setAttribute('href', '#');
button2.textContent = 'New game';


//append winner screen elements to page
header2.append(title2);
header2.appendChild(paragraphE);
header2.appendChild(button2);
winnerScreenDiv.appendChild(header2);
document.querySelector('body').append(winnerScreenDiv)

}
//endgame
 //reset the board
