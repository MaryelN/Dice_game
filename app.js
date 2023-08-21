
//Buttons
const dice = document.querySelector(".dice");

const btnRoll = document.querySelector(".roll");

const btnHold = document.getElementById("hold");

const btnClear = document.getElementById("clear");

const player1 = document.getElementById("score-1");

const player2 = document.getElementById("score-2");


btnRoll.addEventListener("click", function() {
  const randomNum = Math.floor(Math.random() * 6 ) + 1;
  dice.src = `/assets/images/dice-${randomNum}.png`;
  console.log(randomNum);
});





