import Home from './pages/home/home';
import MyAlbum from './pages/story/story';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { MainNav } from "./componenets/Nav";

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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
