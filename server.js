const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// 🔹 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// 🟢 Home Route with Clickable Link
app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to the Student API</h1>
        <p>Click <a href="/students">here</a> to view the students list.</p>
    `);
});

// 🔹 Student Routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/students', studentRoutes);


// 🔹 Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

