import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import Login from "./auth/Login.tsx";
import Jukebox from "./routes/Jukebox.tsx";
import App from "./App.tsx";
import store from "./store.ts";
import Learning from "./routes/Learning.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/user",
    element: <App />,
    children: [
      {
        index: true,
        path: "dashboard",
        element: <Jukebox />,
      },
      {
        path: "learning",
        element: <Learning />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
