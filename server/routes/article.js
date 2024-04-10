const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');

router.get('/teamhighlights/:teamName', async (req, res) => {
    try {
        const query = req.params.teamName; // Assuming you pass the query parameter in the URL, e.g., /api/youtube?query=your_query
        if (!query) {
            return res.status(400).json({ error: 'Missing query parameter' });
        }

        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: query + 'highlights',
                key: process.env.YOUTUBE_API_KEY,
                maxResults: 4,
                order: 'relevance',
                maxres: 'high',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;