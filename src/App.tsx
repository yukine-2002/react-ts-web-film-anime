import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./grid.css";
import Header from "./component/header/header";
import lazyLoading from "./component/lazyLoading/lazyLoading";
import CollectionPage from "./pages/collection-page/collection-page";
import { useEffect } from "react";
import { auth, createUserProfileDocument } from "./firebase/firebase";
import { useAppDispatch, useAppSelector } from "./redux/useTypeSelector";
import { setCurrentUser } from "./redux/auth/auth.action";
import ReadStoryPage from "./pages/read-story-page/read-story-page";

const HomePages = lazyLoading(() => import("./pages/home-page/home-page"));
const WatchVideos = lazyLoading(
  () => import("./pages/watch-video/watch-video")
);
const LoginPage = lazyLoading(() => import("./pages/login-page/login-page"));
const UserPages = lazyLoading(() => import("./pages/user-page/user-page"));
const StoryPages = lazyLoading(() => import("./pages/story-page/story-page"));
const InfoStoryPage = lazyLoading(
  () => import("./pages/info-story-page/info-story-page")
);
const InfoAnimePage = lazyLoading(
  () => import("./pages/info-anime-page/info-anime-page")
);
const PageTest = lazyLoading(
  () => import("./pages/page-test")
);

function App() {
  const dispatch = useAppDispatch();
  const selectUser = useAppSelector((state) => state.auth!.currentUser);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const snapshot = await createUserProfileDocument(user);
        dispatch(
          setCurrentUser({ uid: snapshot.id, ...snapshot.data() }) as any
        );
      }
    });
  }, [auth.currentUser]);

  return (
    <div id="main">
      <Header />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/home" element={<PageTest />} />

        <Route path="/anime">
          <Route path=":slug/:name" element={<WatchVideos />} />
        </Route>
        <Route path="/anime/:slug" element={<InfoAnimePage />} />
        <Route path="/:category">
          <Route path=":slug" element={<CollectionPage />} />
        </Route>
        <Route path="/profile">
          <Route path=":uid" element={<UserPages />} />
        </Route>
        <Route path="story" element={<StoryPages />} />

        <Route path="/story">
          <Route path=":slug" element={<InfoStoryPage />} />
          <Route path=":slug/:chap" element={<ReadStoryPage />} />
        </Route>

        <Route
          path="login"
          element={selectUser ? <Navigate to="/" /> : <LoginPage />}
        />
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
