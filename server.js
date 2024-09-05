const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const productController = require('./controllers/productController');

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server); // Create Socket.IO server on top of HTTP server

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/catFoodDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle new product event from the client
  socket.on('new-product', (product) => {
    console.log('New product received:', product);

    // Broadcast the new product to all connected clients
    io.emit('product-added', product);
  });
});

// API endpoints to get and add products
app.get('/api/products', productController.getProducts);
app.post('/api/products', productController.addProduct);

// Test endpoint to check if the API is working
app.get('/api/test', (req, res) => {
  res.json({ message: "API is working correctly!" });
});

// Set up the port for the server
const port = process.env.PORT || 3027;
server.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});

module.exports = app; // Export app for testing or other use



