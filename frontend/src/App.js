import Home from './pages/home/home';
import MyAlbum from './pages/story/story';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { MainNav } from "./componenets/Nav";
import Gallery from "./pages/gallery/Gallery";
import AdventureForm from "./pages/form/AdventureForm";

const App = (props) => {
  const navAndPage = (page) => (
    <>
      <MainNav />
      {page}
    </>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: navAndPage(<Home />),
    },
    {
      path: "/story",
      element: navAndPage(<MyAlbum />),
    },
    {
      path: "/gallery",
      element: navAndPage(<Gallery />),
    },
    {
      path: "/create",
      element: navAndPage(<AdventureForm />),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
