import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoteList from "./pages/NoteList";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import NoteDetail from "./pages/NoteDetail";
import { useAuthStore } from "./store/auth";
import type { JSX } from "react";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = useAuthStore((s) => s.accessToken);
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <NoteList />
            </PrivateRoute>
          }
        />
        <Route
          path="/notes/new"
          element={
            <PrivateRoute>
              <AddNote />
            </PrivateRoute>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <PrivateRoute>
              <NoteDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/notes/:id/edit"
          element={
            <PrivateRoute>
              <EditNote />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
