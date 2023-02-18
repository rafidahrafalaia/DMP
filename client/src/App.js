import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Jobs from "./pages/Jobs";
import DetailJob from "./pages/DetailJob";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/jobs/detail/:id" element={<DetailJob/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
