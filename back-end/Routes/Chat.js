import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();

dotenv.config();

router.post('/', async (req, res) => {
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n-latest-i720.onrender.com/webhook-test/7a4dbf65-29c8-4ed5-868f-a61af82e9dc5';

    if (!N8N_WEBHOOK_URL) {
        console.error("N8N_WEBHOOK_URL is not set.");
        // Always respond with the format the front-end expects
        return res.status(500).json({ generatedMessage: 'Error: The N8N_WEBHOOK_URL is not set on the server.' });
    }

    const prompt = req.body.newMessage;
    if (!prompt) {
        return res.status(400).json({ generatedMessage: 'Error: No message sent from the front-end.' });
    }

    try {
        const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt }),
        });

        // Get the raw text of the response first
        const responseText = await n8nResponse.text();

        // Handle cases where the n8n service itself returns an error (like 404 or 500)
        if (!n8nResponse.ok) {
            console.error(`n8n webhook failed with status ${n8nResponse.status}:`, responseText);
            return res.status(502).json({ generatedMessage: `Error: The AI service returned an error (status ${n8nResponse.status}). Check if the n8n workflow is active and the URL is correct.` });
        }

        // Handle cases where n8n returns an empty response
        if (!responseText) {
            console.error('n8n webhook returned an empty response.');
            return res.status(502).json({ generatedMessage: 'Error: The AI service returned a completely empty response.' });
        }

        // Try to parse the text as JSON. If it fails, we know the format is wrong.
        try {
            const n8nData = JSON.parse(responseText);

            // Check if the valid JSON contains the data we need
            if (!n8nData.generatedMessage) {
                console.error('The n8n response is missing the "generatedMessage" field.', n8nData);
                return res.status(502).json({ generatedMessage: 'Error: The AI service response was missing the required "generatedMessage" field.' });
            }

            // Success! Send the data to the front-end
            res.json(n8nData);

        } catch (e) {
            console.error('Failed to parse JSON from n8n webhook. Raw response was:', responseText);
            res.status(502).json({ generatedMessage: 'Error: The AI service returned an invalid (non-JSON) response. The workflow may not be configured to return JSON data.' });
        }

    } catch (error) {
        console.error('A network error occurred while trying to call the n8n webhook:', error.message);
        res.status(500).json({ generatedMessage: 'Error: Could not communicate with the AI service. Check the server logs.' });
    }
});

export default router;