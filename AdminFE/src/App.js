import "./App.css";
import Defaultlayout from "./Component/DefaultLayout";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/*" element={<Defaultlayout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
