import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import HomePages from "./pages/homepage";
import NewsPage from "./pages/news";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/">
          <Route index element={<HomePages />} />
          <Route path="/news" element={<NewsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
