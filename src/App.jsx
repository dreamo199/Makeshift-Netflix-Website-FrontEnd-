import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MovieDetails from "./pages/MovieDetails";
import Homepage from "./pages/Homepage";
import UserPage from "./pages/UserPage";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage"


function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
