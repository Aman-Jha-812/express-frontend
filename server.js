const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const FLASK_BACKEND_URL = process.env.FLASK_BACKEND_URL || 'http://localhost:5000';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/status', async (req, res) => {
    try {
        const backendResponse = await axios.get(`${FLASK_BACKEND_URL}/api/health`);
        res.json({
            frontend: 'Express Frontend is running!',
            backend: backendResponse.data,
            status: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            frontend: 'Express Frontend is running!',
            backend: 'Unable to connect to Flask backend',
            status: 'disconnected',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

app.get('/api/data', async (req, res) => {
    try {
        const backendResponse = await axios.get(`${FLASK_BACKEND_URL}/api/data`);
        res.json({
            source: 'express-frontend',
            backend_data: backendResponse.data,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch data from backend',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const backendResponse = await axios.get(`${FLASK_BACKEND_URL}/api/users`);
        res.json({
            source: 'express-frontend',
            users: backendResponse.data,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch users from backend',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        service: 'express-frontend',
        port: PORT,
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express frontend server running on http://0.0.0.0:${PORT}`);
    console.log(`Backend URL: ${FLASK_BACKEND_URL}`);
});