import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { store } from "./store/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/main/Home";
import SidebarWrapper from "./components/SidebarWrapper";
import BookDetails from "./pages/BookDetails";
import FilterBooks from "./pages/FilterBooks";
import AuthLayout from "./components/AuthLayout";
import Logout from "./components/Logout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <AuthLayout>
          <App />
        </AuthLayout>
      }
    >
      <Route
        path="/"
        element={
          <AuthLayout>
            <SidebarWrapper />
          </AuthLayout>
        }
      >
        <Route
          path="/"
          element={
            // <AuthLayout>
            <Home />
            // </AuthLayout>
          }
        ></Route>
        <Route path="/book/:bookId" element={<BookDetails />}></Route>
        <Route path="/all-books/:query" element={<FilterBooks />}></Route>
      </Route>
      <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      ></Route>
      <Route
        path="/signup"
        element={
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        }
      ></Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
