require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const tasksRoutes = require('./routes/tasksRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const profileRoutes = require('./routes/profileRoutes.js')

// ROUTES 
app.use("/tasks", tasksRoutes);
app.use("/user", userRoutes)
app.use("/profile", profileRoutes)

app.get('/', (req, res) => {
  res.send('Hello, Express API!');
});

// CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
