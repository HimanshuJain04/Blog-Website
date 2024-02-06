import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import { useSelector } from "react-redux";
import CreatePost from "./components/CreatePost";
import Error from "./pages/Error";
import MyPosts from "./pages/MyPosts";

function App() {

  const showCreatePost = useSelector(state => state.showCreatePost.value);

  return (
    <div>
      <Navbar></Navbar>

      <div className={` fixed flex justify-center items-center top-0 w-full h-[100vh] backdrop-blur-md ` + (showCreatePost ? " block" : " hidden")}>
        <CreatePost />
      </div>

      <div className="w-full  min-h-[calc(100vh-65px)] mb-10 mt-24 justify-center flex items-center m-auto">

        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myPosts" element={<MyPosts />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
