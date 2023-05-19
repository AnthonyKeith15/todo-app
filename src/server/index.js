const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Routes
app.use('/todos', todosRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});