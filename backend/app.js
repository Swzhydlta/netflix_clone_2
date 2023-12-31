const serverless = require("serverless-http");
const express = require("express");
const app = express();
const userRoutes = require("./routes/user-routes");
const cors = require("cors");

// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
// };
// app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/api/info", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);

  const responseData = { application: "sample-app", version: "1" };

  res.json(responseData);
});
app.use("/users", userRoutes);

app.post("/api/v1/getback", (req, res) => {
  res.send({ ...req.body });
});

// app.listen(3001, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);
