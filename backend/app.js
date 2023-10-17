const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { getUsers } = require("./dynamo");
const userRoutes = require("./routes/user-routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/api/info", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);

  const responseData = { application: "sample-app", version: "1" };

  res.json(responseData);
});
app.use("/users", userRoutes);
// app.get("/api/get-users", async (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   try {
//     const users = await getUsers();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ err: "Something went wrong" });
//   }
// });

app.post("/api/v1/getback", (req, res) => {
  res.send({ ...req.body });
});
app.listen(3000, () => console.log(`Listening on: 3000`));
// module.exports.handler = serverless(app);
