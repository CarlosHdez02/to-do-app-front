import "./App.css";
//Registration and login components
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Missing from "./components/Missing";
import PersistentLogin from "./components/PersistentLogin";
import Register from "./components/Register";
import RequireAuth from "./components/RequiredAuth";
import AppPage from "./components/AppPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/*  Routes*/}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="app" element={<AppPage />} />
      {/* Protected Route*/}
      <Route element={<PersistentLogin />}>
        <Route element={<RequireAuth />}></Route>
      </Route>
      {/* Error route */}
      <Route path="*" element={<Missing />} />{" "}
    </Routes>
  );
}

export default App;
