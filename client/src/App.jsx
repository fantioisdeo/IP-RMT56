import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import LoginForm from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
