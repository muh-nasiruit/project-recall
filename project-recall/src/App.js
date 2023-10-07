import { useNavigate } from "react-router-dom";
import img from "./assets/logo.png";

function App() {
  let navigate = useNavigate();
  return (
    <>
      <div className="navbar">
        <span className="logo" onClick={() => navigate("/")}>
          <img className="logo-img" src={img} alt="logo" />
          <h1>Project Recall</h1>
        </span>
      </div>

    </>
  );
}

export default App;
