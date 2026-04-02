import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./SCSS/style.scss";
import "./fa/all.min.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
