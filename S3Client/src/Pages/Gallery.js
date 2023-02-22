import { useState, useEffect } from "react";
import "../Components/Assets/gallery.css";
import axios from "axios";

const Gallery = () => {
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

  const handleAction = () => {
    window.location.href = "/Upload";
  };

  return (
    <>
      {data.length === 0 && (
        <>
          <div className="container">
            <br />

            <div
              class="toast show"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div class="toast-body">
                We have nothing for you.
                <div class="mt-2 pt-2 border-top">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={handleAction}
                  >
                    Upload?
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    data-bs-dismiss="toast"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="container px-4 px-lg-5 h-100">
        {data.map((currElem) => {
          const date = new Date(currElem.uploadDate);
          const formattedDate = date.toLocaleString();
          const sample =
            "http://assignmentstuff1.s3.amazonaws.com/" + currElem.fileName;
          return (
            <>
              {" "}
              <br />
              <div
                className="card border-warning text-white bg-dark card mb-3"
                style={{ maxWidth: "740px", height: "200px" }}
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      id="bruh-img"
                      src={sample}
                      className="img-fluid rounded-start"
                      alt="Sample image"
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i>
                          <b>Filename:</b>
                        </i>{" "}
                        {currElem.fileName}
                      </h5>
                      <p className="card-text">
                        <i>
                          <b>info: </b>
                        </i>
                        <small className="text-muted">
                          {currElem.description}
                        </small>
                      </p>
                      <p className="card-text">
                        <i>
                          <b>Uploaded on: </b>
                        </i>
                        <small className="text-muted">{formattedDate}</small>
                      </p>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a
                      href={`/View?photoId=${currElem.fileName}`}
                      class="btn btn-warning"
                    >
                      &nbsp;View photo&nbsp;
                    </a>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Gallery;
