import React, { useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Modal,
    TextField,
  } from "@mui/material";

import {
  createProject,
  uploadImage
} from "../../services/project";

export function AddProject(props) {
  const fileInputRef = useRef();
//   const isEdit = props.isEdit ? true : false;
  const defaults = props.default;

  const [values, setValues] = useState({
    thumbnail: defaults?.thumbnail || "",
    title: defaults?.title || "",
    desc: defaults?.desc || "",
    githubLink: defaults?.githubLink || "",
    projectLink: defaults?.projectLink || "",
    tags: defaults?.tags || ["", ""],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUploadStarted, setImageUploadStarted] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
//   const [submitButtonDisabled, setSetSubmitButtonDisabled] = useState(false);
  

  const handlePointUpdate = (value, index) => {
    const tempPoints = [...values.tags];
    tempPoints[index] = value;
    setValues((prev) => ({ ...prev, tags: tempPoints }));
  };

  const handleAddPoint = () => {
    if (values.tags.length > 4) return;
    setValues((prev) => ({ ...prev, tags: [...values.tags, ""] }));
  };

  const handlePointDelete = (index) => {
    const tempPoints = [...values.tags];
    tempPoints.splice(index, 1);
    setValues((prev) => ({ ...prev, tags: tempPoints }));
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageUploadStarted(true);
    uploadImage(
      file,
      (progress) => {
        setImageUploadProgress(progress);
      },
      (url) => {
        setImageUploadStarted(false);
        setImageUploadProgress(0);
        setValues((prev) => ({ ...prev, thumbnail: url }));
      },
      (error) => {
        setImageUploadStarted(false);
        setErrorMessage(error);
      }
    );
  };

  const validateForm = () => {
    const actualPoints = values.tags.filter((item) => item.trim());

    let isValid = true;

    if (!values.thumbnail) {
      isValid = false;
      setErrorMessage("Thumbnail for project is required");
    } else if (!values.githubLink) {
      isValid = false;
      setErrorMessage("Project's repository link required");
    } else if (!values.title) {
      isValid = false;
      setErrorMessage("Project's Title required");
    } else if (!values.desc) {
      isValid = false;
      setErrorMessage("Project's Overview required");
    } else if (!actualPoints.length) {
      isValid = false;
      setErrorMessage("Description of Project is required");
    } else if (actualPoints.length < 2) {
      isValid = false;
      setErrorMessage("Minimum 2 description points required");
    } else {
      setErrorMessage("");
    }

    return isValid;
  };

  const handleSubmission = async () => {
    if (!validateForm()) return;

    // setSetSubmitButtonDisabled(true);
    // if (isEdit)
    //   await updateProjectInDatabase(
    //     { ...values, refUser: props.uid },
    //     defaults.pid
    //   );
    // else await addProjectInDatabase({ ...values, refUser: props.uid });
    await createProject({ ...values, userId: props.uid });
    // setSetSubmitButtonDisabled(false);
    // if (props.onSubmission) props.onSubmission();
    if (props.onClose) props.onClose();
  };

  return (
    <Modal open={props.show} onClose={() => (props.onClose ? props.onClose() : "")}>
      <div className="pro-container">
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
        <div className="pro-inner">
          <div className="pro-left">
            <div className="pro-image">
              <img
                src={
                  values.thumbnail ||
                  "https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder-300x200.png"
                }
                alt="Thumbnail"
                onClick={() => fileInputRef.current.click()}
              />
              {imageUploadStarted && (
                <p>
                  <span>{imageUploadProgress.toFixed(2)}%</span> Uploaded
                </p>
              )}
            </div>

            <TextField
              label="Github Link"
              value={values.githubLink}
              placeholder="Project Repository Link"
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  githubLink: event.target.value,
                }))
              }
            />
            <TextField
              label="Deployed link"
              placeholder="Project Deployed link"
              value={values.projectLink}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  projectLink: event.target.value,
                }))
              }
            />
          </div>
          <div className="pro-right">
            <TextField
              label="Project Title"
              placeholder="Enter Project Title"
              value={values.title}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
            />
            <TextField
              label="Project Description"
              placeholder="Brief Overview"
              value={values.desc}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  desc: event.target.value,
                }))
              }
            />

            <div className="pro-description">
              <div className="pro-top">
                <p className="pro-title">Tech Stack</p>
                <p className="pro-link" onClick={handleAddPoint}>
                  + Add a Tag
                </p>
              </div>
              <div className="pro-inputs">
                {values.tags.map((item, index) => (
                  <div className="pro-input" key={index}>
                    <TextField
                      key={index}
                      placeholder="Attach Tags"
                      value={item}
                      onChange={(event) =>
                        handlePointUpdate(event.target.value, index)
                      }
                    />
                    {index > 1 && (
                      <CloseIcon onClick={() => handlePointDelete(index)} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="pro-error">{errorMessage}</p>
        <div className="pro-footer">
          <Button
            className="pro-cancel"
            // onClick={() => (props.onClose ? props.onClose() : "")}
            onClick={() => console.log(values)}
          >
            Cancel
          </Button>
          <Button
            className="pro-button"
            onClick={handleSubmission}
            // disabled={submitButtonDisabled}
            disabled={false}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
}