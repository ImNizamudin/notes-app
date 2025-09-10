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
import VerifyEmailNotification from "./pages/VerifyEmailNotification";
import VerifyEmail from "./pages/VerifyEmail";
import type { JSX } from "react";
import Profile from "./pages/Profile";
import Media from "./pages/Media";
import { useEffect } from "react";

function setupGlobalErrorHandling() {
  const originalErrorHandler = window.onerror;
  const originalPromiseHandler = window.onunhandledrejection;

  window.onerror = function (message, source, lineno, colno, error) {
    if (message.toString().includes("Token expired") ||
        message.toString().includes("Unauthorized")) {
      useAuthStore.getState().logout();
    }

    if (originalErrorHandler) {
      return originalErrorHandler.call(this, message, source, lineno, colno, error);
    }

    return false;
  }

  window.onunhandledrejection = function (event) {
    if (event.reason?.message?.includes("Token expired") ||
        event.reason?.message?.includes("Unauthorized") ||
        event.reason?.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    if (originalPromiseHandler) {
      return originalPromiseHandler?.call(this as Window, event);
    }

    return false;
  }
}

function PrivateRoute({ children, activeMenu }: { children: JSX.Element; activeMenu?: string }) {
  const token = useAuthStore((s) => s.accessToken);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const exp = payload.exp * 1000;
          if (Date.now() >= exp) { 
            logout;
          }
        } catch {
          logout;
        }
      }
    };

  }, [logout]);

  return token ? <MainLayout activeMenu={activeMenu}>{children}</MainLayout> : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: JSX.Element }) {
  const token = useAuthStore((s) => s.accessToken);
  return token ? <Navigate to="/" /> : children;
}

export default function App() {
  useEffect(() => {
    setupGlobalErrorHandling();
  }, []);

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
        <Route path="/verify-email/notification" element={<VerifyEmailNotification />} />

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