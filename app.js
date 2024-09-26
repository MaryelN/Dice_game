require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose');
const Player = require('./models/game.model.js');
const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));
// Middleware to parse JSON
app.use(express.json());

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
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
})
.catch((err) => console.error('Connection error:', err));

// Middleware and other app configurations...


// mongoose.connect("mongodb+srv://Dice:A1b2c3d4e5!@cluster0.6rn7l.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=Cluster0")
// .then(() => {
//   console.log('Connected!');
//   app.listen(3000, () => {
//     console.log('Server is running on port 3000')
//   })
// })
// .catch(() => {
//   console.log('Connection failed!');
// });
