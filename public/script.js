//Buttons
const dice = document.getElementById("dice");

const btnRoll = document.getElementById("roll");

const btnHold = document.getElementById("hold");

const btnClear = document.getElementById("clear");

const btnInfo = document.getElementById("info");

const btnClose = document.getElementById("close");

const btnShowWinners = document.getElementById('show-winners');

//Information display
btnInfo.addEventListener("click", function() {

  document.querySelector(".rules").style.display = "block";

  btnClose.addEventListener("click", function() {

    document.querySelector(".rules").style.display = "none";
})
});

let activePlayer = 1;
let currentScore = 0;
let score = 0;


btnRoll.addEventListener("click", function() {
  //Set the active player  
    const activePlayerClass = document.getElementById(`current-${activePlayer}`);
    activePlayerClass.classList.add("active");

  //Random number inside the fuction so it changes everytime the button is clicked
  const randomNum = Math.floor(Math.random() * 6 ) + 1;
  
  //Change the dice image
  dice.src = `./assets/images/dice-${randomNum}.png`;

  //Add and display the random number if !== 1
  if (randomNum !== 1) {
    currentScore += randomNum;

    // currentPlayer1.innerHTML = currentScore on html;
    document.getElementById(`current-${activePlayer}`).innerHTML = currentScore;

  } else {
    currentScore = 0;
    //set the current score to 0 on html
    document.getElementById(`current-${activePlayer}`).innerHTML = 0;
    activePlayerClass.classList.remove("active");
    
    //change of player
    activePlayer = activePlayer === 1 ? 2 : 1;
    document.getElementById(`current-${activePlayer}`).classList.add("active");
    // activePlayer2.classList.add("active");
  }
});


btnHold.addEventListener("click", function() {
  
  const activeScore = document.getElementById(`score-${activePlayer}`);

  score = parseInt(activeScore.innerHTML); 
  score += currentScore;
  activeScore.innerHTML = score;

  if (activeScore.innerHTML >= 50) {
    const playerName = prompt(`Player ${activePlayer}, enter your name: `);
    
    // Send the winner's data to the backend
    fetch('/api/winner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playerName,
        score: score,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Winner saved:', data);

        // Fetch and display the latest winners in a popup
        fetch('/api/players')
          .then((response) => response.json())
          .then((data) => {
            const winners = data.data;
            let winnersList = '<h3>Latest Winners:</h3>';
            winners.forEach((winner) => {
              winnersList += `<p>${winner.name} - ${winner.score} points</p>`;
            });

            alert(winnersList); // Display the popup
          });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    btnClear.click(); 
  } else {
  // change of player
  const activePlayerClass = document.getElementById(`current-${activePlayer}`);
  activePlayerClass.classList.remove("active");
  //set the current score to 0 on html
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).innerHTML = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  document.getElementById(`current-${activePlayer}`).innerHTML = currentScore;
  document.getElementById(`current-${activePlayer}`).classList.add("active");
  }
});

btnClear.addEventListener("click", function() {
  currentScore = 0;
  score = 0;
  document.getElementById("current-1").innerHTML = 0;
  document.getElementById("current-2").innerHTML = 0;
  document.getElementById("score-1").innerHTML = 0;
  document.getElementById("score-2").innerHTML = 0;
  document.getElementById(`current-${activePlayer}`).classList.remove("active");
})

function fetchAndShowWinners() {
  // Fetch the latest winners
  fetch('/api/players')
    .then((response) => response.json())
    .then((data) => {
      const winners = data.data;
      let winnersList = '<h3>Latest Winners:</h3>';
      winners.forEach((winner) => {
        winnersList += `<p>${winner.name} - date : ${winner.date} </p>`;
      });

      // Insert winners into the modal body
      document.getElementById('winnersList').innerHTML = winnersList;

      // Display the modal using Bootstrap
      const winnersModal = new bootstrap.Modal(document.getElementById('winnersModal'));
      winnersModal.show();
    })
    .catch((error) => {
      console.error('Error fetching winners:', error);
    });
}

btnShowWinners.addEventListener('click', function() {
  fetchAndShowWinners();  // Show the modal
});