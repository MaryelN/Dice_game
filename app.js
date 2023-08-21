
//Buttons
const dice = document.querySelector(".dice");

const btnRoll = document.querySelector(".roll");

const btnHold = document.getElementById("hold");

const btnClear = document.getElementById("clear");

const currentPlayer1 = document.getElementById("current-1");

const currentPlayer2 = document.getElementById("current-2");

const player1 = document.getElementById("score-1");

const player2 = document.getElementById("score-2");

const activePlayer = document.querySelector(".player-1");

const activePlayer2 = document.querySelector(".player-2");

let currentScore = 0;

btnRoll.addEventListener("click", function() {
    
    activePlayer.classList.add("active");

  //Random number inside the fuction so it changes everytime the button is clicked
  const randomNum = Math.floor(Math.random() * 6 ) + 1;
  
  //Change the dice image
  dice.src = `/assets/images/dice-${randomNum}.png`;
  
  console.log(randomNum);

  //Add and display the random number if !== 1
  if (randomNum !== 1) {
    currentScore += randomNum;
    currentPlayer1.innerHTML = currentScore;

  } else {
    currentScore = 0;
    currentPlayer1.innerHTML = currentScore;
    activePlayer.classList.remove("active");
  }
    
});




