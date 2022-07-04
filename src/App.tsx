import { Route, Routes } from "react-router-dom";
import "./App.css";
import mainLogo from "./assests//anime-logo-png-7-removebg-preview (1).png";
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

      <footer>
        <div className="copyright">@ Copyright anime 2022</div>
        <div className="logo">
          <img src={mainLogo} alt="" />
        </div>
        <div className="design">Design by Buithanh</div>
      </footer>
    </div>
  );
}

export default App;
