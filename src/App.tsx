import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./SCSS/style.scss";
import "./fa/all.min.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";
import DevCursor from "./components/DevCursor";
import { GlowEffect } from "./components/Func/GlowEffect";
import { useEffect } from "react";
import UpButton from "./components/Func/UpButton";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    GlowEffect();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <DevCursor />
      <UpButton />
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
