import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { fetchProjects } from "../../services/project";
import {
  CircularProgress,
} from "@mui/material";

export default function Projects() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [projectsArr, setProjects] = useState([]);
  const [projectsLoaded, setProjectsLoaded] = useState(false);




  useEffect(() => {
    const userName = localStorage.getItem("currentUserName");
    setUserName(userName);
    const email = localStorage.getItem("currentUserEmail");
    setEmail(email);
    const user = localStorage.getItem("currentUserId");
    setUserId(user);
  }, [userId]);

  useEffect(() => {
    
    fetchProjects(userId).then((results) => {
      if (!results) {
        setProjectsLoaded(true);
        return;
      }
      setProjectsLoaded(true);
  
      setProjects(results);
    })
  }, [userId])
  



  return (
    <>
      <div className="dash-main-container">
        <Sidebar username={userName} email={email} />

        <div className="dash-subcontainer">
        <div className="sec2-content">
          <h2>Current Projects</h2>

        </div>
        <div className="sec2-card-container">
        {projectsLoaded ? (
            projectsArr.length > 0 ? (
          projectsArr.map((val, idx) => {
            return <Card key={idx} imgSrc={val.thumbnail} title={val.title} />;
          })) : <CircularProgress color="inherit" />) : <p>No projects found</p>}
          {/* })) : <p>No projects found</p>) : <CircularProgress color="inherit" />} */}
        </div>

        </div>
      </div>
    </>
  );
}

function Card({ imgSrc, title }) {
  return (
    <>
      <div className="sec2-card">
        <img src={imgSrc} alt="##" />
        <h6>{title}</h6>
      </div>
    </>
  );
}
