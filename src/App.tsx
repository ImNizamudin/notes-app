import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoteList from "./pages/NoteList";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import NoteDetail from "./pages/NoteDetail";
import { useAuthStore } from "./store/auth";
import MainLayout from "./layouts/MainLayout";
import EmailVerified from "./pages/EmailVerified";
import VerifyEmail from "./pages/VerifyEmail";
import type { JSX } from "react";
import Profile from "./pages/Profile";
import Media from "./pages/Media";

function PrivateRoute({ children, activeMenu }: { children: JSX.Element; activeMenu?: string }) {
  const token = useAuthStore((s) => s.accessToken);
  return token ? <MainLayout activeMenu={activeMenu}>{children}</MainLayout> : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: JSX.Element }) {
  const token = useAuthStore((s) => s.accessToken);
  return token ? <Navigate to="/" /> : children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerified />} />

        <Route
          path="/"
          element={
            <PrivateRoute activeMenu="notes">
              <NoteList />
            </PrivateRoute>
          }
        />
        <Route
          path="/notes/new"
          element={
            <PrivateRoute activeMenu="notes">
              <AddNote />
            </PrivateRoute>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <PrivateRoute activeMenu="notes">
              <NoteDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/notes/:id/edit"
          element={
            <PrivateRoute activeMenu="notes">
              <EditNote />
            </PrivateRoute>
          }
        />
        <Route
          path="/media"
          element={
            <PrivateRoute activeMenu="media">
              <Media />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute activeMenu="profile">
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}