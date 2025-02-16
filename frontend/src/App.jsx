import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

import { Route, Routes } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
