import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NodulesPage from "./pages/NodulesPage";
function App() {
  return (
    <BrowserRouter basename="/breastultrasound">
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/nodules" element={<NodulesPage />} />
        {/* <Route path="/tumores/<id>" element={<NodulesPage/>} /> */}
      </Routes>
    </Router>
    </BrowserRouter>
  );
}

export default App;
