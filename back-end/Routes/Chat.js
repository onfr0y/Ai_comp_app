import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();
    
// It's a good practice to load environment variables at the start
dotenv.config();

router.post('/', async (req, res) => {
    

    //
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';

    if (!N8N_WEBHOOK_URL) {
        console.error("N8N_WEBHOOK_URL is not set. Please check your .env file.");
        return res.status(500).json({ error: 'AI service is not configured.' });
    }

    // Extract only the new message (the prompt) from the request body.
    // The front-end sends `newMessage`. We'll use that as the prompt.
    const prompt = req.body.newMessage;

    // Validate that a prompt was actually sent.
    if (!prompt) {
        return res.status(400).json({ error: 'No prompt (newMessage) was provided in the request body.' });
    }

    try {
        // Make the call to your n8n webhook, sending ONLY the prompt.
        // Your n8n workflow should be configured to receive a simple JSON object
        // like: { "prompt": "The user's question goes here" }
        const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        });

        // Handle cases where the n8n webhook call fails
        if (!n8nResponse.ok) {
            const errorDetails = await n8nResponse.text();
            console.error(`n8n webhook failed with status: ${n8nResponse.status}`, errorDetails);
            throw new Error(`The AI service returned an error.`);
        }

        // Parse the JSON response from n8n
        const n8nData = await n8nResponse.json();

        // --- IMPORTANT ---
        // The front-end expects the final AI response in a field called `generatedMessage`.
        // You need to make sure your n8n workflow returns the AI's text in that exact field.
        // For example, your n8n workflow should end with a node that produces:
        // { "generatedMessage": "This is the response from the AI." }
        //
        res.json(n8nData);

    } catch (error) {
        console.error('Error calling n8n webhook:', error.message);
        res.status(500).json({ error: 'There was an issue communicating with the AI service.' });
    }
});

export default router;
