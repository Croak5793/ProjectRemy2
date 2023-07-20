import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpOrLogin from "./components/SignUpOrLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpOrLogin />} />
        {/* More routes will be added here in the future */}
      </Routes>
    </Router>
  );
}

export default App;
