import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPageWeb from "./packages/blocks/chat/ChatPage.web";
import SingletonFactory from "./packages/framework/src/SingletonFactory";

const restAPIBlock = SingletonFactory.getRestBlockInstance();
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
