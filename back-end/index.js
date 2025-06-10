const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv')

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.get('/', (req, res) => {
    res.send('test');
  });
  


  // Configure Google Generative AI
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error('Error: GEMINI_API_KEY environment variable not set.');
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(API_KEY);

// Define a route for handling chat (multi-turn conversations)
app.post('/api/chat', async (req, res) => {
    // 1. Extract data from the request body
    const { history = [], newMessage, modelName = 'gemini-pro' } = req.body;

    // 2. Basic input validation
    if (!newMessage) {
        return res.status(400).json({ error: 'New message is required for chat.' });
    }

    try {
        // 3. Get the Generative Model instance
        const model = genAI.getGenerativeModel({ model: modelName });

        const chat = model.startChat({ history });

        // 5. Send the new message to the chat session
        const result = await chat.sendMessage(newMessage);

        // 6. Extract the generated response
        const response = await result.response;
        const text = response.text();

        // 7. Send the AI's response back to the frontend
        res.json({ generatedMessage: text });

    } catch (error) {
        // 8. Error handling
        console.error('Backend error in chat:', error);
        // Distinguish between different types of errors if needed (e.g., API rate limits)
        res.status(500).json({ error: 'Failed to process chat message with Gemini API.' });
    }
});
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  module.exports = app; 