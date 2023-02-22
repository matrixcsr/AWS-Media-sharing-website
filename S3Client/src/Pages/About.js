import "../Components/Assets/about.css";
const About = () => {
  return (
    <>
      <div class="slide">
        <header class="masthead2">
          <div class="container px-4 px-lg-5 h-100">
            <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
              <div class="col-lg-8 align-self-end">
                <h1 class="text-white font-weight-bold">
                  Web application developed and deployed by:
                </h1>
                <h3 class="text-white font-weight-light">Rahul & Gurdit</h3>
                <hr class="divider" />
              </div>
              <div class="col-lg-8 align-self-baseline">
                <h5 class="text-white font-weight-light">
                  Sources and refrences
                </h5>
                <p class="text-white-75 mb-5">
                  <b>Chat-GPT</b>
                </p>
                <p class="text-white-75 mb-5">
                  <b>Nav-bar</b>: https://colorlib.com/wp/bootstrap-sidebar/
                </p>
                <p class="text-white-75 mb-5">
                  <b>Landing-page</b>: https://startbootstrap.com/theme/creative
                </p>
                <p class="text-white-75 mb-5">
                  <b>AWS deployment</b>: Cloudformation stack from Lab/app.zip
                </p>
                <a class="btn btn-primary btn-xl" href="/Gallery">
                  Explore Gallery
                </a>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default About;
