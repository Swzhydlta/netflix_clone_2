import "./_styles.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { userService } from "../../services/userService";

interface Props {
  setIsAuthenticated: (input: boolean) => void;
}

export default function LoginPage({ setIsAuthenticated }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    const requestData = {
      email: email,
      password: password,
    };
    const requestBody = JSON.stringify(requestData);
    try {
      const response = await userService.login(requestBody);
      localStorage.setItem("user", JSON.stringify(response));
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-header-wrapper">
          <h2>SHOWREPO</h2>
        </div>

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
        <button onClick={login}>
          {loading ? <AiOutlineLoading3Quarters className="spin" /> : "Login"}
        </button>
      </div>
    </div>
  );
}
