import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Post, Profile, ReviewDetail, ReviewList } from "./pages";
import "./App.css";
import Layout from "./layout";
import Posts from "./pages/profile/Posts";
import Bookmark from "./pages/profile/Bookmark";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="/profile" element={<Profile />}>
              <Route path="posts" element={<Posts />} />
              <Route path="bookmark" element={<Bookmark />} />
            </Route>
            <Route path="/reviewDetail/:id" element={<ReviewDetail />} />
            <Route path="/reviewList/:id" element={<ReviewList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
