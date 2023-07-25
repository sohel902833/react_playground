import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Check from "./pages/Check";
import Home from "./pages/Home";
import HomeSecond from "./pages/HomeSecond";
import ParentHome from "./pages/ParentHome";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<HomeSecond />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </Router>
  );
};

export default App;
