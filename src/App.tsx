import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPageWeb from "./packages/blocks/chat/ChatPage.web";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPageWeb />} />
      </Routes>
    </Router>
  );
};

export default App;
