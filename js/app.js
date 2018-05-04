//###Classes and Constructors

/*--- PAGES---*/

//create page class for all pages
class Page {
  constructor (setClass, id, textContent, paraE, display) {
    //create page elements
    this.pageBody = document.querySelector('body');
    this.ssDiv =  document.createElement('div');
    this.header = document.createElement('header');
    this.title = document.createElement('h1');
    this.form = document.createElement('form');
    this.playerNameInput = document.createElement('input');
    this.paragraphE = document.createElement('p');

    //set page attributes/styles
    this.ssDiv.className = setClass;
    this.ssDiv.id = id;
    this.title.textContent = textContent;
    this.paragraphE.classList.add(paraE);
    this.playerNameInput.style.display = display;
    this.playerNameInput.className = 'button';
    this.playerNameInput.type = 'text';
    this.playerNameInput.name = 'playerName';
    this.playerNameInput.style.marginTop = '5px';
  }

  //append page elements function
  appendPageElements() {
    this.pageBody.append(this.ssDiv);
    this.ssDiv.appendChild(this.header);
    this.header.appendChild(this.title);
    this.header.appendChild(this.paragraphE);
    this.header.appendChild(this.form);
    this.form.appendChild(this.playerNameInput);
  }
}

//create new start page
const startPage = new Page('screen screen-start', 'start', 'Tic Tac Toe', 'message', 'none');

/*---BUTTONS---*/

//create buttons class for all buttons
class Buttons {
  constructor (gameMode) {
    this.button = document.createElement('button');
    this.button.className = 'button';
    this.button.textContent = gameMode;
    this.button.name = 'button';
    this.button.span = document.createElement('span');
  }

  //append button to page function
  appendButton() {
    this.button.span.appendChild(this.button);
    startPage.form.appendChild(this.button.span);
  }

  runGameMode () {
    pvpButton.button.span.remove();
    playerVsComputerButton.button.span.remove();
    startPage.playerNameInput.style.display = 'inline';
    startPage.playerNameInput.focus();
    nameButton.button.style.display = 'block';
  }
}

//create pvp button
const pvpButton = new Buttons('Player vs. Player');

//create player vs computer button
const playerVsComputerButton = new Buttons('Player vs. Computer');

//create user submit name button
const nameButton = new Buttons('Submit Player1 Name');

//create new game button
const newGameButton = new Buttons('New game');

//###Game Board

/*---Game Board Variables---*/

//select the box area
const boxArea = document.querySelector('.boxes');

//select the boxes on the board
let box = document.querySelectorAll('.box');

//create array of all possible win combinations
let winParameters = [
[box[0], box[1], box[2]],
[box[3], box[4], box[5]],
[box[6], box[7], box[8]],

[box[0], box[3], box[6]],
[box[1], box[4], box[7]],
[box[2], box[5], box[8]],

[box[0], box[4], box[8]],
[box[2], box[4], box[6]],
];

//create a random number to choose player 1
let randomNum = Math.floor(Math.random() * 2);

//create arrays to capture each players selections/move
let player1Selections = [];
let player2Selections = [];

// capture index number of box
let boxIndexNum;

/*---Game Board Functions---*/

//create name div function
const createPlayerNameDiv = (playerTag, playerName) => {
  let playerNameDiv = document.createElement('p');
  playerNameDiv.classList.add('name');
  playerNameDiv.textContent = playerName;
  playerTag.append(playerNameDiv);
};

//create player1 moves
const player1Move = (e) => {
    // if player1 is active and the selected box is empty - run code
    if (player1.className === 'players active' && e.target.className === 'box') {
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
  if (player2.className === 'players active' && e.target.className === 'box') {

    //mark the user's selection by adding class for player 1
    e.target.classList.add('box-filled-2');

    //add player2's selection to player2's selection array
    player2Selections.push(e.target);

    //check to see if player 2 is the winner, show player 2 winner page if true
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
  } while ((player2.className === 'players active' && box[boxIndexNum].className !== 'box') && (winner(winParameters, player1Selections)) !== true);
  if (player2.className === 'players active' && box[boxIndexNum].className === 'box') {
    //add player2's/computer's selection to player2's/computer's selection array
    box[boxIndexNum].classList.add('box-filled-2');
    player2Selections.push(box[boxIndexNum]);

    //check to see if player 2 is the winner, show player 2 winner page if true
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
    for (let i = 0; i < winParameters.length; i++) {
      if (winParameters[i].every(checkedBox => playerSelections.indexOf(checkedBox) != -1))
      return true;
    }

    return false;
  };

//create winner screen function
const createEndGameScreen = (winnerClassName) => {
  //create winner page
  const winnerPage = new Page(winnerClassName, 'finish', 'Tic Tac Toe', 'message', 'none');

  //append winner screen elements to page
  winnerPage.appendPageElements();
  winnerPage.header.appendChild(newGameButton.button);

  //check which player is active
  if (player1.className === 'players active') {

    //set text content of p element to indicate the winner
    winnerPage.paragraphE.textContent = `${player1.children[1].textContent} is the Winner!`;
  } else if (player2.className === 'players active') {
    winnerPage.paragraphE.textContent = `${player2.children[1].textContent} is the Winner!`;
  }
};

//show winner function
const showWinnner = (player, playerSelections) => {
  //check if the players selections match any of the win parameters
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
};

//showTie function
const showTie = (playerSelections) => {
  if ((playerSelections.length === 5) && (board.style.display === 'block')) {
    //hide the board
    board.style.display = 'none';

    //show tie page
    const tiePage = new Page('screen screen-win screen-win-tie', 'finish', 'Tic Tac Toe', 'message', 'none');

    //append winner screen elements to page
    tiePage.appendPageElements();
    tiePage.header.appendChild(newGameButton.button);

    //set text content of p element
    tiePage.paragraphE.textContent = 'It\'s a Tie!';
  }
};

//###Function calls

/*---Start Screen---*/

//hide the board
board.style.display = 'none';

//append start page elements
startPage.appendPageElements();

//hide name button
nameButton.button.style.display = 'none';

//append start page game mode buttons
let button1 = [pvpButton, playerVsComputerButton, nameButton];
button1.forEach(function (button) {
  button.appendButton();
});

//add event listener on pvp button to hide start screen and display the board game
pvpButton.button.onclick = () => {
  pvpButton.runGameMode();
  createPlayerNameDiv(player2, '');

  //decide which players turn is first
  if (randomNum === 0) {
    player2.classList.add('active');
  } else {
    player1.classList.add('active');
  }

  //add an event listener to the boxArea
  boxArea.onclick = (e) => {
    player1Move(e);
    player2Move(e);
  };
};

//add event listner on player vs computer button
playerVsComputerButton.button.onclick = () => {
  playerVsComputerButton.runGameMode();

  //create computer player name
  createPlayerNameDiv(player2, 'Computer');

  //check if the user is playing the computer
  if (startPage.playerNameInput.value !== '' && nameButton.button.textContent === 'Submit Player1 Name') {

    //get player 1's name
    let playerName = startPage.playerNameInput.value;
    createPlayerNameDiv(player1, playerName);
    startPage.playerNameInput.value = '';
    startPage.ssDiv.style.display = 'none';
    board.style.display = 'block';
  }

  //decide which players turn is first
  if (randomNum === 0) {
    player2.classList.add('active');
    computerMoves();
  } else {
    player1.classList.add('active');
  }

  //add an event listener to the boxArea
  boxArea.onclick = (e) => {
    player1Move(e);

    //prevent computer from making a move (stop loop) if the game ends in a tie
    if (winner(winParameters, player1Selections) !== true &&  board.style.display !== 'none') {
      computerMoves(e);
    }
  };
};

//add event listener to name buttons to capture player names
startPage.form.onsubmit = (e) => {
  //prevent form from submiting
  e.preventDefault();

  //check if player1 name field is blank; if not, append player name
  if (startPage.playerNameInput.value !== '' && nameButton.button.textContent === 'Submit Player1 Name') {
    let playerName = startPage.playerNameInput.value;

    //get players name
    createPlayerNameDiv(player1, playerName);
    startPage.playerNameInput.value = '';

    //ask for player 2's name if not playing the computer
    if (player2.children[1].textContent !== 'Computer') {
      nameButton.button.textContent = 'Please Submit Player2 Name';
    } else {
      startPage.ssDiv.style.display = 'none';
      board.style.display = 'block';
    }
  } else {
    //alert user to enter a name
    startPage.playerNameInput.placeholder = 'Please submit a Name';
    startPage.playerNameInput.style.borderColor = 'red';
  }

  //get player 2's name
  if (startPage.playerNameInput.value !== '' && nameButton.button.textContent === 'Please Submit Player2 Name') {
    player2.children[1].textContent = startPage.playerNameInput.value;

    //hide the start screen and show the game board
    startPage.ssDiv.style.display = 'none';
    board.style.display = 'block';
  }
};

//create mouseover on the box area
boxArea.onmouseover = (e) => {
  //add highlighted area over box
  if (e.target.className === 'box box-filled-1' || e.target.className === 'box box-filled-2') {
    return;
  }

  if (player1.className === 'players active') {
    //get image from imag folder
    e.target.style.backgroundImage = 'url("./img/o.svg")';
  }else {
    e.target.style.backgroundImage = 'url("./img/x.svg")';
  }

  //reset the highlighted box
  setTimeout(function () {
    e.target.style.backgroundImage = '';
  }, 500);
};

//add event listener to new game button to reset game
newGameButton.button.onclick = () => {
    window.location.reload(true);
  };
