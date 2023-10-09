import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  IconButton,
  Modal,
  TextField,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";

export default function ProjectModal(props) {
  console.log(props);
  return (
    <>
      <Modal
        open={props.show}
        onClose={() => (props.onClose ? props.onClose() : "")}
      >
        <div className="project-modal">
          {props.data && (
            <Card sx={{ width: "100%", border: "none", boxShadow: "none",  }}>
              <CardMedia
                component="img"
                alt="card img"
                height="250px"
                image={props.data.thumbnail}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {props.data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {props.data.desc}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton 
                  size="small"
                  component={Link}
                  to={`//${props.data.githubLink}`}
                  target="_blank"
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton 
                  size="small"
                  component={Link}
                  to={`//${props.data.projectLink}`}
                  target="_blank"
                >
                  <LinkIcon />
                </IconButton>
              </CardActions>
            </Card>
          )}
        </div>
      </Modal>
    </>
  );
}
