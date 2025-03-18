require("reflect-metadata");
const express = require("express");
const { createConnection } = require("typeorm");
const User = require("./entity/User");

const app = express();
const port = 3000;

app.use(express.json());

createConnection()
  .then((connection) => {
    const userRepository = connection.getRepository(User);

    app.get("/users", async (req, res) => {
      try {
        const users = await userRepository.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post("/user", async (req, res) => {
      try {
        const user = userRepository.create(req.body);
        await userRepository.save(user);
        res.status(201).json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
