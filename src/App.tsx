import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  Post,
  Profile,
  ReviewDetail,
  ReviewList,
  Setting,
} from "./pages";
import "./App.css";
import Layout from "./layout";
import Posts from "./pages/profile/Posts";
import Bookmark from "./pages/profile/Bookmark";
import Edit from "./pages/edit/Edit";
import Event from "./pages/notices/event/Event";
import Restaurant from "./pages/notices/restaurant/Restaurant";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="/edit" element={<Edit />} />

            <Route path="/profile" element={<Profile />}>
              <Route path="posts" element={<Posts />} />
              <Route path="bookmark" element={<Bookmark />} />
            </Route>
            <Route path="/reviewDetail/:id" element={<ReviewDetail />} />
            <Route path="/reviewList/:id" element={<ReviewList />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/notice-event" element={<Event />} />
          <Route path="/notice-event-restaurant" element={<Restaurant />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
