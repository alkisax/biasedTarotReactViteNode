require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors()); // Allow all origins

const { tarotDeck, draw } = require('./tarotLogic/tarotCards');

tarot_prompt =  
  "You are a Tarot interpreter. Provide a detailed interpretation of the following Tarot cards in direct response to the question asked. For each card, describe its meaning thoroughly and explain its relevance to the question. After interpreting each card individually, provide a combined interpretation that synthesizes the meanings of all the cards in relation to the question asked. Avoid any introductory or contextual information, and focus solely on delivering a profound and insightful analysis of the individual cards and their combined significance. Do not refer to yourself or anything outside of the Tarot cards and their meanings."

// Get the question from query parameters
const userQuestion =  "What do I need to know today?"; 

// Draw three unique tarot cards
const drawnCards = draw();

console.log(`
  draw:
  first: ${tarotDeck[drawnCards.first]}
  second: ${tarotDeck[drawnCards.second]}
  third: ${tarotDeck[drawnCards.third]}
  `);

// Format the selected cards
const selectedCards = [
    tarotDeck[drawnCards.first],
    tarotDeck[drawnCards.second],
    tarotDeck[drawnCards.third]
];

// Construct the full message for GPT-4
const fullPrompt = `${tarot_prompt} 
Question: ${userQuestion} 
Drawn Cards: ${selectedCards.join(', ')}`;

const apiKey = process.env.OPENAI_API_KEY;
const url = 'https://api.openai.com/v1/chat/completions'
console.log("Starting");


app.get('/test-openai', (req, res) => {
    if (!apiKey) {
        return res.status(500).json({ error: 'Missing OpenAI API key' });
    }
    
    axios.post(url, {
        model: 'gpt-4',
        messages: [{ role: 'user', content: fullPrompt }]
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
      const message = response.data.choices[0].message.content;
      console.log('Response Received');  
      console.trace("Log trace");    
      // console.log('Full Response:', response.data);
      console.log('drawnCards',drawnCards);
      
      res.json({
        drawnCards: drawnCards,
        selectedCards: selectedCards,  // Send the drawn cards array
        gptResponse: message        // Send the GPT-4 response
      });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});