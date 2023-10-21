import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login-page/LoginPage";
import HomePage from "./pages/home-page/HomePage";
import Navbar from "./components/navbar/Navbar";
import ShowPage from "./pages/show-page/ShowPage";
import RootPage from "./pages/root-page/RootPage";
import "./App.scss";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleAuthentication = (input: boolean) => {
    setIsAuthenticated(input);
  };

  return (
    <div id="app">
      <Router>
        {isAuthenticated && (
          <Navbar setIsAuthenticated={handleAuthentication} />
        )}
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={handleAuthentication} />}
          />
          <Route
            path="home"
            element={<HomePage isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="shows/:show"
            element={<ShowPage isAuthenticated={isAuthenticated} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
