const { getUsers, addOrUpdateUser, findUserByEmail } = require("../dynamo");
const { v4: uuidv4 } = require("uuid");
const { addEpisodeToUser } = require("../utilities/functions");

const addUsersController = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  const { email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser.Count > 0) {
      res.status(409).json({ error: "User with this email already exists" });
    } else {
      const userWithId = {
        id: uuidv4(),
        email: email,
        password: password,
      };

      await addOrUpdateUser(userWithId);

      res.status(200).json({ message: "User added successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add user" });
  }
};

const addOrUpdateUserShows = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  const { email, episodeDetails, showName } = req.body;

  try {
    const data = await findUserByEmail(email);

    if (data.Count > 0) {
      const user = data.Items[0];
      const updatedUser = addEpisodeToUser(user, episodeDetails, showName);
      await addOrUpdateUser(updatedUser);
      res
        .status(200)
        .json({ email: updatedUser.email, shows: updatedUser.shows });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
};

const findUserByEmailController = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);

  const { email, password } = req.body;

  try {
    const data = await findUserByEmail(email);

    if (data.Count > 0) {
      const user = data.Items[0];

      if (user.password === password) {
        res.status(200).json({ email: user.email, shows: user.shows });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to find user by email" });
  }
};

module.exports = {
  addUsersController,
  findUserByEmailController,
  addOrUpdateUserShows,
};
