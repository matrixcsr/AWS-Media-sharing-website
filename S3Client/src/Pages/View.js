import sample from "../Components/Assets/images/bg.jpg";
import "../Components/Assets/view.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const View = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fileName = searchParams.get("photoId");
  sample = "http://assignmentstuff1.s3.amazonaws.com/" + fileName;

  const [data, setData] = useState([]);

  const getUsers = async () => {
    let config = {};
    const response = await axios.get("http://44.213.138.226:3000/list", config);
    setData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteImage = async (fileName, description) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        const response = await axios.delete(
          `http://44.213.138.226:3000/delete/${fileName}/${description}`
        );
        console.log(response.data);
        // Remove the deleted image from the state
        setData(data.filter((image) => image.fileName !== fileName));
        // Redirect to /Gallery
        window.location.href = "/Gallery";
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {data.map((currElem) => {
        if (currElem.fileName === fileName) {
          const date = new Date(currElem.uploadDate);
          const formattedDate = date.toLocaleString();
          return (
            <>
              <br />
              <br />
              <div className="container px-4 px-lg-5 h-100">
                <div className="container">
                  <div class="card mb-3 border-warning">
                    <div class="centered-horizontally">
                      <img
                        id="bruh1-img"
                        src={sample}
                        class="card-img-top"
                        alt="..."
                      />
                    </div>

                    <div class="card-body">
                      <h5 class="card-title">Filename: {currElem.fileName}</h5>
                      <p class="card-text">
                        <b>Description:</b> {currElem.description}
                      </p>
                      <p class="card-text">
                        <small class="text-muted">
                          <b>Uploaded on:</b> {formattedDate}
                        </small>
                      </p>
                      <div class="container px-4 text-center">
                        <div class="row gx-5">
                          <div class="col">
                            <div class="p-3">
                              {" "}
                              <div
                                class="card text-right"
                                style={{ width: "18rem" }}
                              >
                                <a
                                  href={`http://44.213.138.226:3000/fetch/${currElem.fileName}`}
                                  class="btn btn-info"
                                  download
                                >
                                  Download image
                                </a>
                              </div>
                            </div>
                          </div>
                          <div class="col">
                            <div class="p-3">
                              {" "}
                              <div
                                class="card text-right"
                                style={{ width: "18rem" }}
                              >
                                <button
                                  class="btn btn-danger"
                                  onClick={() =>
                                    handleDeleteImage(
                                      currElem.fileName,
                                      currElem.description
                                    )
                                  }
                                >
                                  Delete Image
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }
      })}
    </>
  );
};

export default View;
