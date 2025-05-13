const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const logger = require('./utils/logger');
const { scrapeEvents } = require('./utils/scraper');
const apiRoutes = require('./routes/api');
const eventService = require('./services/eventService');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Make io available to other modules
app.set('io', io);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sydney-events', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    logger.info('Connected to MongoDB');
    
    // Schedule the scraping task to run every 5 minutes
    cron.schedule('*/5 * * * *', async () => {
      try {
        logger.info('Running scheduled event scraping...');
        await eventService.updateEvents(io);
        logger.info('Scheduled event scraping completed');
      } catch (error) {
        logger.error('Error in scheduled scraping:', error);
      }
    });
    
    // Initial scraping when the server starts
    eventService.updateEvents(io).catch(err => {
      logger.error('Initial scraping failed:', err);
    });
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = server;