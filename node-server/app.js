// index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

const mongoURI = process.env.MONGO_URI;
const mongoHost = process.env.MONGO_HOST;

// Connect to MongoDB (replace the URL with your own MongoDB URL)
mongoose
  .connect(`mongodb://admin:admin@${mongoHost}:27017/database`, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((e) => console.error(`Failed with error : ${e}`));

// Define the schema for the collection
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Define the model
const User = mongoose.model("User", userSchema);

const corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

// Route to get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new user
app.post("/users", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
