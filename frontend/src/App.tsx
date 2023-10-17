import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login-page/LoginPage";

function App() {
  const test = async () => {
    const url =
      "https://pjditaizu4.execute-api.us-east-1.amazonaws.com/dev/api/info";
    const headers = {
      Accept: "*/*",
    };

    const options = {
      method: "GET",
      headers,
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
    <div id="app">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/about" component={About} /> */}
        </Routes>
      </Router>
      {/* <div>
        <button onClick={test}>test</button>
      </div> */}
    </div>
  );
}

export default App;
