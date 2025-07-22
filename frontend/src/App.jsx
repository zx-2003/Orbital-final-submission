import { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import YourPosts from './pages/YourPosts';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from "./components/ProfilePage";
import EditProfile from "./components/EditProfile";
import ExplorePosts from "./pages/ExplorePosts";
import PublicProfilePage from "./components/PublicProfilePage";
import Promotion from "./pages/Promotion"
import FindFood from "./pages/FindFood";
import FollowingPosts from "./components/FriendPost";
import FriendPosts from "./pages/FriendPosts";
import UserPostCreation from "./pages/UserPostCreation";
import SavedPosts from "./pages/SavedPosts";

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

// the paths here is for the react app which is what the user will see anyway, the backend urls are handled elsewhere
// the elemenets are the different components we created the paths are what we type into hopbar to get there
// protected route needs us to login first, if not we will be redirected to login route. 
// route will decide which component will be displayed
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ExplorePosts />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element = {<ProtectedRoute> <ProfilePage /> </ProtectedRoute>} />
        <Route path="/edit_profile" element = {<ProtectedRoute> <EditProfile /> </ProtectedRoute>} />
        <Route path="/yourPosts" element = {<ProtectedRoute> <YourPosts /> </ProtectedRoute>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/explore_posts" element={<ProtectedRoute> <ExplorePosts /> </ProtectedRoute>} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/publicProfile/:user_id" element={<ProtectedRoute> <PublicProfilePage /> </ProtectedRoute>}></Route>
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/findfood" element={<FindFood />} />
        <Route path="/friendPosts" element={<ProtectedRoute> <FriendPosts /> </ProtectedRoute>} />
        <Route path="/userPostCreation" element={<ProtectedRoute> <UserPostCreation /> </ProtectedRoute>} />
        <Route path="/savedPosts" element={<ProtectedRoute> <SavedPosts/> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
