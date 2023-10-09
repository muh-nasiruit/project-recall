import { useEffect, useState, useRef } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { fetchProjects } from "../../services/project";
import { CircularProgress, Chip, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Projects() {
  const search = useRef("");
  const [searched, setSearched] = useState("");
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
    });
  }, [userId]);

  return (
    <>
      <div className="dash-main-container">
        <Sidebar username={userName} email={email} />

        <div className="dash-subcontainer">
          <div className="sec2-content">
            <h2>Current Projects</h2>
          </div>
          <div className="searchbox-container">

          <div className="searchboxinput">
            <InputBase
              // className={}
              inputRef={search}
              sx={{ ml: 1, flex: 1, width: "50%" }}
              placeholder="Search Here"
              onChange={(e) => setSearched(e.target.value)}
              // inputProps={{ 'aria-label': 'search google maps' }}
              />

            <IconButton
              onClick={() => setSearched(search.current.value)}
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              >
              <SearchIcon />
            </IconButton>
          </div>
              </div>
          <div className="sec2-card-container">
            {projectsLoaded ? (
              projectsArr.length > 0 ? (
                projectsArr.filter((item) => {
                  return searched.toLowerCase() === ""
                    ? item
                    : (item.title.toLowerCase().includes(searched.toLowerCase()) || 
                    (item.tags.map((i) => i.toLowerCase()).includes(searched.toLowerCase())));
                }).map((val, idx) => {
                  return (
                    <Card
                      key={idx}
                      imgSrc={val.thumbnail}
                      title={val.title}
                      tags={val.tags}
                      desc={val.desc}
                    />
                  );
                })
              ) : (
                <CircularProgress color="inherit" />
              )
            ) : (
              <p>No projects found</p>
            )}
            {/* })) : <p>No projects found</p>) : <CircularProgress color="inherit" />} */}
          </div>
        </div>
      </div>
    </>
  );
}

function Card({ imgSrc, title, tags, desc }) {
  return (
    <>
      <div className="sec2-card">
        <img src={imgSrc} alt="##" />
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="sec2-tags">
          {tags.length > 0
            ? tags.map((val, idx) => {
                return <Chip key={idx} label={val} size="small" />;
              })
            : ""}
        </div>
        <p></p>
      </div>
    </>
  );
}
