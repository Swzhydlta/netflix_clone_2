import { useNavigate } from "react-router-dom";
import "./_styles.scss";
export default function Navbar() {
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
    </div>
  );
}
