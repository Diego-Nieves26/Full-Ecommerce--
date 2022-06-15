import "./App.css";
import { Nav, LoadingScreen, ProtectedRoutes, Modal } from "./components";
import { Home, Login, ProductItem, User, Purchases } from "./pages";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const isLoading = useSelector((state) => state.loading);
  const showModal = useSelector((state) => state.modal);
  window.scroll({
    top: 1,
    behavior: 'smooth'
  });
  return (
    <HashRouter>
      {isLoading && <LoadingScreen />}
      <Nav />
      {showModal !== null && <Modal text={showModal} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductItem />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/user" element={<User />} />
          <Route path="/purchases" element={<Purchases />} />
        </Route>
      </Routes>
      <footer>
        <h2>@ Academlo 2022</h2>
        <div>
          <a href="/">
            <i className="bx bxl-instagram"></i>
          </a>
          <a href="/">
            <i className="bx bxl-linkedin"></i>
          </a>
          <a href="/">
            <i className="bx bxl-twitter"></i>
          </a>
        </div>
      </footer>
    </HashRouter>
  );
}

export default App;
