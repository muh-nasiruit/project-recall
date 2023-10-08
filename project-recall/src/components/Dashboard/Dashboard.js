import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logoImg from "../../assets/logo.png";
import { Button } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { AddProject } from "../AddProject/AddProject";
import Sidebar from "../Sidebar/Sidebar";

export default function Dashboard(props) {
  // const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem("currentUserName");
    setUserName(userName);
    const email = localStorage.getItem("currentUserEmail");
    setEmail(email);
    const userId = localStorage.getItem("currentUserId");
    setUserId(userId);
  }, []);

  return (
    <>
      <div className="dash-main-container">
        <Sidebar username={userName} email={email} />

        <div className="dash-subcontainer">
          <div className="dash-text">
            Welcome <span>{userName}</span>
          </div>
          <Button
            onClick={() => setShowProjectForm(true)}
            variant="outlined"
            startIcon={<PostAddIcon />}
          >
            Add a Project
          </Button>

            <AddProject
            // onSubmission={fetchAllProjects}
            show={showProjectForm}
            onClose={() => setShowProjectForm(false)}
            uid={userId}
            isEdit={false}
            // default={editProject}
            />
        </div>
      </div>
    </>
  );
}
