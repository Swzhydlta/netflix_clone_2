import { useNavigate } from "react-router-dom";
import "./_styles.scss";
interface Props {
  setIsAuthenticated: (input: boolean) => void;
}
export default function Navbar({ setIsAuthenticated }: Props) {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/home");
  };
  return (
    <div className="navbar-wrapper">
      <div className="nav-title" onClick={navigateHome}>
        SHOWREPO
      </div>
      <input type="text" placeholder="search" className="search-bar"></input>
      <div className="logout-wrapper">
        <button onClick={() => setIsAuthenticated(false)}>Logout</button>
      </div>
    </div>
  );
}
