import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Navbar from "./Pages/Navbar";
import Gallery from "./Pages/Gallery";
import Upload from "./Pages/Upload";
import View from "./Pages/View";
import "./Components/Assets/main.css";
const App = () => {
  let appRoutes;

  appRoutes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Gallery" element={<Gallery />} />
      <Route path="/About" element={<About />} />
      <Route path="/Upload" element={<Upload />} />
      <Route path="/View" element={<View />} />
    </Routes>
  );
  return (
    <>
      <BrowserRouter>
        <div class="content">
          <div class="left">
            <div class="logo">
              <Navbar />
            </div>
          </div>
          <div class="right">
            {appRoutes}
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};
export default App;
