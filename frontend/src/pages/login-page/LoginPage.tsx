import "./_styles.scss";
import { useState } from "react";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const url =
      "https://pjditaizu4.execute-api.us-east-1.amazonaws.com/dev/users/get-user";
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const requestData = {
      // Add your data here
      email: email,
      password: password,
    };
    const requestBody = JSON.stringify(requestData);

    const options = {
      method: "POST",
      headers,
      body: requestBody,
    };
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log("json", json);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}
