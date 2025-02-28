import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div className="home-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
