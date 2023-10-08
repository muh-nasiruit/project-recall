import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ChecklistIcon from "@mui/icons-material/Checklist";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export default function Sidebar(props) {
  const navigate = useNavigate();

  return (
    <>
    
      <nav className="sidebar">
        <div>
          <span className="side-brand" onClick={() => navigate("/dashboard")}>
            <img src={logoImg} alt="#" className="side-logo" />
            {/* <span className="material-icons-outlined" >
          layers
      </span>
      <span>DRAW STACK</span> */}
          </span>
          <ul className="side-tools">
            <li>
              <span href="#" onClick={() => navigate("/dashboard/projects/all")}>
                <div className="material">
                  <FormatListBulletedIcon />
                </div>
                <div>Current Projects</div>
              </span>
            </li>
            <li>
              <span
                href="#"
                onClick={() => navigate("/dashboard/projects/archived")}
              >
                <div className="material">
                  <SaveIcon />
                </div>
                <div>Archived Projects</div>
              </span>
            </li>
            <li>
              <span
                href="#"
                onClick={() => navigate("/dashboard/projects/completed")}
              >
                <div className="material">
                  <ChecklistIcon />
                </div>
                <div>Completed Projects</div>
              </span>
            </li>
          </ul>
          <hr />
          <div className="side-profile">
            <h5>{props.username}</h5>
            <span className="material">
              <VerifiedUserIcon />
            </span>
          </div>
          <div className="side-email">{props.email}</div>
          <Button
            // className="side-logout-btn"
             variant="outlined"
            onClick={() => navigate("/")}
          >
            Logout
          </Button>
        </div>
      </nav>
      </>
  );
}
