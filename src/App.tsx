import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./grid.css";
import Header from "./component/header/header";
import lazyLoading from "./component/lazyLoading/lazyLoading";
import CollectionPage from "./pages/collectionpage/collectionpage";
const HomePages = lazyLoading(() => import("./pages/homepage/homepage"));
const WatchVideos = lazyLoading(() => import("./pages/watchvideo/watchvideo"));

function App() {
  return (
    <div id="main">
      <Header />

      <Routes>
        <Route path="/" element={<HomePages />} />

        <Route path="/watch">
          <Route path=":slug/:name" element={<WatchVideos />} />
        </Route>

        <Route path="/:category">
          <Route path=":slug" element={<CollectionPage />} />
        </Route>
      </Routes>

      <footer className="section">
        <div className="container">
          <div className="row">
            <div className="col-4 col-md-6 col-sm-12">
              <div className="content">
                <a href="#" className="logo">
                  <i className="bx bx-movie-play bx-tada main-color"></i>Ani
                  <span className="main-color">m</span>e
                </a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                  veniam ex quos hic id nobis beatae earum sapiente! Quod ipsa
                  exercitationem officiis non error illum minima iusto et.
                  Dolores, quibusdam?
                </p>
                <div className="social-list">
                  <a href="#" className="social-item">
                    <i className="bx bxl-facebook"></i>
                  </a>
                  <a href="#" className="social-item">
                    <i className="bx bxl-twitter"></i>
                  </a>
                  <a href="#" className="social-item">
                    <i className="bx bxl-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-8 col-md-6 col-sm-12">
              <div className="row">
                <div className="col-3 col-md-6 col-sm-6">
                  <div className="content">
                    <p>
                      <b>Anime</b>
                    </p>
                    <ul className="footer-menu">
                      <li>
                        <a href="#">Trang chủ</a>
                      </li>
                      <li>
                        <a href="#">Mục Lục</a>
                      </li>
                      <li>
                        <a href="#">Truyện</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-3 col-md-6 col-sm-6">
                  <div className="content">
                    <p>
                      <b>Browse</b>
                    </p>
                    <ul className="footer-menu">
                      <li>
                        <a href="#">Trang chủ</a>
                      </li>
                      <li>
                        <a href="#">Mục Lục</a>
                      </li>
                      <li>
                        <a href="#">Truyện</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-3 col-md-6 col-sm-6">
                  <div className="content">
                    <p>
                      <b>Help</b>
                    </p>
                    <ul className="footer-menu">
                      <li>
                        <a href="#">Trang chủ</a>
                      </li>
                      <li>
                        <a href="#">Mục Lục</a>
                      </li>
                      <li>
                        <a href="#">Truyện</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright">Copyright 2022 Bui Thanh</div>
    </div>
  );
}

export default App;
