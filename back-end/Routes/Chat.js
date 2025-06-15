import express from 'express';
import dotenv from 'dotenv'
const router = express.Router();

router.post('/', async (req, res) => {
   
    const N8N_WEBHOOK_URL = '';
    try {
       
        const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

     
        if (!n8nResponse.ok) {
            throw new Error(`n8n webhook failed jaa at : ${n8nResponse.status}`);
        }


        const n8nData = await n8nResponse.json();

        
        res.json(n8nData);

    } catch (error) {
        console.error('Error calling n8n webhook:', error);
        res.status(500).json({ error: 'cant get the ai' });
    }
});

export default router;