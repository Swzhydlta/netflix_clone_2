import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login-page/LoginPage";
import HomePage from "./pages/home-page/HomePage";
import Navbar from "./components/navbar/Navbar";
import ShowPage from "./pages/show-page/ShowPage";

function App() {
  const test = async () => {
    const url = "https://www.episodate.com/api/show-details?q=arrow";
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
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="shows/:show" element={<ShowPage />} />

          {/* <Route path="/about" component={About} /> */}
        </Routes>
      </Router>
      <div>
        <button onClick={test}>test</button>
      </div>
    </div>
  );
}

export default App;
