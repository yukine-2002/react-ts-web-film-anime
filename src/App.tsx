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
import Footer from "./component/footer/footer";
import HandleError404 from "./pages/404/error-page";

const HomePage = lazyLoading(() => import("./pages/home-page/home-page"))
const AnimePage = lazyLoading(() => import("./pages/anime-page/anime-page"));
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
        <Route path="/" element={<HomePage /> } />

        <Route path="/anime" element={<AnimePage />} />  

        <Route path="/anime">
        <Route path=":slug" element={<InfoAnimePage />} />
          <Route path=":slug/:name" element={<WatchVideos />} />
        </Route>
      

        {/* <Route path="/:category">
          <Route path=":slug" element={<CollectionPage />} />
        </Route> */}
       
        <Route path="story" element={<StoryPages />} />
     
        <Route path="/story">
          <Route path=":slug" element={<InfoStoryPage />} />
          <Route path=":slug/:chap" element={<ReadStoryPage />} />
        </Route>

        <Route path="/profile">
          <Route path=":uid" element={<UserPages />} />
        </Route>
       
        <Route
          path="login"
          element={selectUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route path="error" element={<HandleError404 />} />
      </Routes>
    <Footer />
    </div>
  );
}

export default App;
