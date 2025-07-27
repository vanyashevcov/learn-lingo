import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import { ROUTES } from "./constants/routes";

const Home = lazy(() => import("./pages/Home/Home"));
const Teachers = lazy(() => import("./pages/Teachers/Teachers"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));

Modal.setAppElement("#root");

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
        <main>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.TEACHERS} element={<Teachers />} />
            <Route path={ROUTES.FAVORITES} element={<Favorites />} />
          </Routes>
        </main>
      </Suspense>
    </>
  );
}

export default App;
