# Tarot API

**Run the App:** https://biasedtarot.onrender.com

**Github source code:** https://github.com/alkisax/biasedTarotReactViteNode

**Full README:** https://github.com/alkisax/biasedTarotReactViteNode/blob/main/README.md

## Overview
This project is a tarot reading API that selects random tarot cards and uses OpenAI's GPT API to provide interpretations. It also integrates with MongoDB to store user queries.

## Features
- Draws three unique tarot cards from a full deck of 78 cards.
- Sends the drawn cards to OpenAI's GPT model for interpretation.
- Supports multilingual tarot readings (English and Greek).
- Stores user queries in a MongoDB database.
- Provides endpoints for testing API responses and querying MongoDB.

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- OpenAI API (GPT-3.5/4)
- Axios
- CORS
- Morgan (for logging)
- dotenv (for environment variables)

### API Endpoints
#### Draw a tarot reading
```
GET /test-openai?userQuestion=Your+question&bias=Your+bias&lang=en
```
- **userQuestion**: The question asked by the user (default: "What do I need to know today?")
- **bias**: Optional parameter to guide the interpretation.
- **lang**: Language for interpretation (`en` for English, `el` for Greek).

#### Fetch stored queries from MongoDB
```
GET /api/test-mongoDB/
```
Returns all stored user queries.

## Project Structure
```
├── tarotLogic/
│   ├── tarotCards.js  # Handles tarot deck and card drawing
├── GPTLogic.js        # Handles OpenAI API requests
├── server.js          # Main Express server
├── .env               # Environment variables
├── package.json       # Dependencies and scripts
```



