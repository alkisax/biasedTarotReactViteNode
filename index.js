require('dotenv').config();

const express = require('express');
const app = express();

// const axios = require('axios');

app.use(express.json());

const cors = require("cors");
app.use(cors()); // Allow all origins

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static('dist')) // to create static render for dist, on the server

const { getTarotReading } = require('./GPTLogic');

const apiKey = process.env.OPENAI_API_KEY;
console.log("Starting");

app.get('/test-openai', (req, res) => {
  const userQuestion = req.query.userQuestion || "What do I need to know today?"; // Default question if not provided
  const bias = req.query.bias;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing OpenAI API key' });
  }

  getTarotReading(userQuestion, apiKey, bias)
    .then(result => {
      res.json({
        drawnCards: result.drawnCards,
        selectedCards: result.selectedCards,
        gptResponse: result.gptResponse,
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: error.message });
    });
});



// Catch-all route for unknown endpoints (404)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
// Error handling middleware (MUST be the last middleware)
const errorHandler = (error, request, response, next) => {
  console.error(error.message); // Log error message
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' });
  }
  // If error is not a CastError, pass it to the default Express error handler
  next(error);
};
// Add unknown endpoint middleware before the error handler
app.use(unknownEndpoint);
// Add the error handler as the last middleware
app.use(errorHandler);


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
