import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./.dashboard";
import CreateSite from "./CreateSite";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <BrowserRouter>

     <div>
          <Link to="/">Dashboard</Link>
          <Link to="/create">Create</Link>
           <Link to="/login">Login</Link>
           <Link to="/register">Register</Link>
        </div>
            
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateSite />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
