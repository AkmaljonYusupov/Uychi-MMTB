import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HeroSlider from "./components/Hero/HeroSlider";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <HeroSlider/>
      <Footer />
      <Routes>
        {/* Routes */}
      </Routes>
    </>
  );
}

export default App;