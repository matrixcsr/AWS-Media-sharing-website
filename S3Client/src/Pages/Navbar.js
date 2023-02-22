import "../Components/Assets/nav.css";

const Navbar = () => {
  return (
    <>
      <div className="vertical-nav bg-dark" id="sidebar">
        <div className="py-4 px-3 mb-4 bg-dark">
          <div className="media d-flex align-items-center">
            <img
              src="https://i.ibb.co/ZBb6xZw/Fh-Clta-VXw-AIdh-AT.jpg"
              alt="..."
              width="65"
              className="mr-3 rounded-circle img-thumbnail shadow-sm"
            />
            <div className="media-body">
              <p className="font-weight-white text-muted mb-0">
                <h4 className="font-weight-white m-0">Matrix</h4>
              </p>
              <p className="font-weight-white text-muted mb-0">Photo Gallery</p>
            </div>
          </div>
        </div>

        <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">
          Main
        </p>

        <ul className="nav flex-column bg-dark mb-0">
          <li className="nav-item">
            <a href="/" className="nav-link text-white font-italic">
              <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/About" className="nav-link text-white font-italic">
              <i className="fa fa-address-card mr-3 text-primary fa-fw"></i>
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/Upload" className="nav-link text-white font-italic">
              <i className="fa fa-cubes mr-3 text-primary fa-fw"></i>
              Upload
            </a>
          </li>
          <li className="nav-item">
            <a href="/Gallery" className="nav-link text-white font-italic">
              <i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>
              Gallery
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
