
//Buttons
const dice = document.getElementById("dice");

const btnRoll = document.getElementById("roll");

const btnHold = document.getElementById("hold");

const btnClear = document.getElementById("clear");

const currentPlayer1 = document.getElementById("current-1");

const currentPlayer2 = document.getElementById("current-2");

const player1 = document.getElementById("score-1");

const player2 = document.getElementById("score-2");

let activePlayer = 1;
let currentScore = 0;

btnRoll.addEventListener("click", function() {
  //Change the active player  
    const activePlayerClass = document.getElementById(`current-${activePlayer}`);
    activePlayerClass.classList.add("active");

  //Random number inside the fuction so it changes everytime the button is clicked
  const randomNum = Math.floor(Math.random() * 6 ) + 1;
  
  //Change the dice image
  dice.src = `/assets/images/dice-${randomNum}.png`;
  
  console.log(randomNum);

  //Add and display the random number if !== 1
  if (randomNum !== 1) {
    currentScore += randomNum;

    // currentPlayer1.innerHTML = currentScore on html;
    document.getElementById(`current-${activePlayer}`).innerHTML = currentScore;

  } else {

    currentScore = 0;
    //set the current score to 0 on html
    document.getElementById(`current-${activePlayer}`).innerHTML = currentScore;
    activePlayerClass.classList.remove("active");
    //change of player

    activePlayer = activePlayer === 1 ? 2 : 1;
    document.getElementById(`current-${activePlayer}`).classList.add("active");
    // activePlayer2.classList.add("active");
  }
    
});




