import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Post, Profile, ReviewDetail, ReviewList } from "./pages";
import "./App.css";
import Layout from "./layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reviewDetail/:id" element={<ReviewDetail />} />
            <Route path="/reviewList/:id" element={<ReviewList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
