const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config/database");

const app = express();
const port = 3000;

const sequelize = new Sequelize({
  host: config.host,
  port: config.port,
  dialect: "mysql",
  username: config.username,
  password: config.password,
  database: config.database,
});

// Define model
const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {}
);

sequelize.sync();

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
