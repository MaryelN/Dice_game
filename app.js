const express = require('express')
const mongoose = require('mongoose');
const Player = require('./models/game.model.js');
const app = express()

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello from Node API Server!');
});

// Route to fetch all players (for the popup to show latest winners)
app.get('/api/players', async(req, res) => {
  try {
    const players = await Player.find().sort({ date: -1}).limit(5);
    res.status(200).json({ message: 'Players fetched successfully', data: players });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to save winner's information
app.post('/api/winner', async (req, res) => {
  try {
    const { name, score } = req.body;

    // Create a new Player instance and save it to the database
    const player = await Player.create({ name, score });
    res.status(200).json({ message: 'Winner saved successfully', data: player });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// MongoDB connection and server start
mongoose.connect("mongodb+srv://Dice:A1b2c3d4e5!@cluster0.6rn7l.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
  console.log('Connected!');
  app.listen(3000, () => {
    console.log('Server is running on port 3000')
  })
})
.catch(() => {
  console.log('Connection failed!');
});

// //Buttons
// const dice = document.getElementById("dice");

// const btnRoll = document.getElementById("roll");

// const btnHold = document.getElementById("hold");

// const btnClear = document.getElementById("clear");

// const btnInfo = document.getElementById("info");

// const btnClose = document.getElementById("close");


// //Information display
// btnInfo.addEventListener("click", function() {

//   document.querySelector(".rules").style.display = "block";

//   btnClose.addEventListener("click", function() {

//     document.querySelector(".rules").style.display = "none";
// })
// });

// let activePlayer = 1;
// let currentScore = 0;
// let score = 0;


// btnRoll.addEventListener("click", function() {
//   //Set the active player  
//     const activePlayerClass = document.getElementById(`current-${activePlayer}`);
//     activePlayerClass.classList.add("active");

//   //Random number inside the fuction so it changes everytime the button is clicked
//   const randomNum = Math.floor(Math.random() * 6 ) + 1;
  
//   //Change the dice image
//   dice.src = `./assets/images/dice-${randomNum}.png`;

//   //Add and display the random number if !== 1
//   if (randomNum !== 1) {
//     currentScore += randomNum;

//     // currentPlayer1.innerHTML = currentScore on html;
//     document.getElementById(`current-${activePlayer}`).innerHTML = currentScore;

//   } else {
//     currentScore = 0;
//     //set the current score to 0 on html
//     document.getElementById(`current-${activePlayer}`).innerHTML = 0;
//     activePlayerClass.classList.remove("active");
    
//     //change of player
//     activePlayer = activePlayer === 1 ? 2 : 1;
//     document.getElementById(`current-${activePlayer}`).classList.add("active");
//     // activePlayer2.classList.add("active");
//   }
// });


// btnHold.addEventListener("click", function() {
  
//   const activeScore = document.getElementById(`score-${activePlayer}`);

//   score = parseInt(activeScore.innerHTML); 
//   score += currentScore;
//   activeScore.innerHTML = score;

//   if (activeScore.innerHTML >= 50) {
//     //Winner alert and reset
//     alert(`Player ${activePlayer} wins!`);
//     btnClear.click();
//   } else {

//   // change of player
//   const activePlayerClass = document.getElementById(`current-${activePlayer}`);
//   activePlayerClass.classList.remove("active");
//   //set the current score to 0 on html
//   currentScore = 0;
//   document.getElementById(`current-${activePlayer}`).innerHTML = 0;
//   activePlayer = activePlayer === 1 ? 2 : 1;
//   //set the current score to 0 on html
//   currentScore = 0;
//   document.getElementById(`current-${activePlayer}`).innerHTML = currentScore;
//   document.getElementById(`current-${activePlayer}`).classList.add("active");
//   }
// });

// btnClear.addEventListener("click", function() {
//   currentScore = 0;
//   score = 0;
//   document.getElementById("current-1").innerHTML = 0;
//   document.getElementById("current-2").innerHTML = 0;
//   document.getElementById("score-1").innerHTML = 0;
//   document.getElementById("score-2").innerHTML = 0;
//   document.getElementById(`current-${activePlayer}`).classList.remove("active");
// })
