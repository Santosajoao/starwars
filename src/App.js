import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Planets } from "./pages/Planets";
import { Starships } from "./pages/Starships";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/planets/:id" element={<Planets />} />
        <Route path="/starships" element={<Starships />} />
        <Route path="/starships/:id" element={<Starships />} />
        <Route
          path="*"
          element={
            <div
              style={{
                backgroundColor: "#1c1e33",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <h1 style={{ textAlign: "center" }}>404 Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
