import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoticePage from "./pages/NoticePage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route element={<ProtectedRoutes />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/notice/:id" element={<NoticePage />} />
        </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
