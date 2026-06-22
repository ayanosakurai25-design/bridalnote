import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TodoListPage from "./pages/TodoListPage";
import GuestListPage from "./pages/GuestListPage";
import TodoCreatePage from "./pages/TodoCreatePage";
import GuestCreatePage from "./pages/GuestCreatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/todos" element={<TodoListPage />} />
        <Route path="/guests" element={<GuestListPage />} />
        <Route path="/todos/new" element={<TodoCreatePage />} />
        <Route path="/guests/new" element={<GuestCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
