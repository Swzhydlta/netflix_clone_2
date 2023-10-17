const { getUsers, addOrUpdateUser, findUserByEmail } = require("../dynamo");
const { v4: uuidv4 } = require("uuid");

const getUsersController = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ err: "Something went wrong" });
  }
};
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
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
};

const findUserByEmailController = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);

  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (user.Count > 0) {
      res.status(200).json(user.Items);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error finding user by email:", error);
    res.status(500).json({ error: "Failed to find user by email" });
  }
};

module.exports = {
  getUsersController,
  addUsersController,
  findUserByEmailController,
};
