import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Anime from "./pages/Anime";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import WishList from "./pages/WishList";
import Journal from "./pages/Journal";

// Rename routes.ts to routes.tsx if JSX is needed, but here we only use Component references

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "anime", Component: Anime },
      { path: "movies", Component: Movies },
      { path: "shows", Component: Shows },
      { path: "wishlist", Component: WishList },
      { path: "journal", Component: Journal },
    ],
  },
]);
