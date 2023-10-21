import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RootPage() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);

  return <div></div>;
}
