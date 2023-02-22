import React, { useState } from "react";
import "../Components/Assets/upload.css";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("description", description);

    axios
      .post("http://44.213.138.226:3000/upload", formData)
      .then((response) => {
        console.log(response.data);
        alert("File uploaded successfully");
        window.location.href = "/Gallery";
      })
      .catch((error) => {
        console.error(error);
        setUploadError("Error uploading file");
      });
  };

  return (
    <>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>File Upload Form</title>
        </head>
        <body>
          <div class="slide">
            <header class="masthead1">
              <br />
              <br />

              <br />
              <br />
              <div className="container">
                <div class="card text-center text-white bg-dark border-warning mb-3 mb-3">
                  <div class="card-header">CCGC-5500</div>
                  <div class="card-body text-warning">
                    <h5 class="card-title">Upload an image to gallery</h5>
                    <br />
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                      <label htmlFor="file">Select a file:</label>
                      <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                      />
                      <br />
                      <br />
                      <label htmlFor="fileName">File Name:&nbsp;</label>
                      <input
                        type="text"
                        id="fileName"
                        name="fileName"
                        value={fileName}
                        onChange={handleFileNameChange}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <label htmlFor="description">Description:&nbsp;</label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                      />
                      <br />
                      <br />
                      <button type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </form>
                    {uploadError && (
                      <div class="alert alert-danger" role="alert">
                        {uploadError}
                      </div>
                    )}
                  </div>
                  <div class="card-footer text-muted">
                    <b>Matrix</b>
                  </div>
                </div>
              </div>
            </header>
          </div>
        </body>
      </html>
    </>
  );
};

export default Upload;
