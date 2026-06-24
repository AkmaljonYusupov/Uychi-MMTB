// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HeroSlider from "./components/HeroSlider/HeroSlider";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";

// Sahifalarni import qilish
import Home from "./pages/Home";
import Rahbariyat from "./pages/Rahbariyat";
import Yangiliklar from "./pages/Yangiliklar/Yangiliklar";
import Galereya from "./pages/Galereya/Galereya";
import Aloqa from "./pages/Aloqa";

// Global SCSS
import "./App.scss";

function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        {/* Bosh sahifa - HeroSlider bilan */}
        <Route path="/" element={
          <>
            <HeroSlider />
            <Home />
          </>
        } />
        
        {/* Boshqa sahifalar - Hero bilan */}
        <Route path="/rahbariyat" element={
          <>
            <Hero />
            <Rahbariyat />
          </>
        } />
        <Route path="/yangiliklar" element={
          <>
            <Hero />
            <Yangiliklar />
          </>
        } />
        <Route path="/galereya" element={
          <>
            <Hero />
            <Galereya />
          </>
        } />
        <Route path="/aloqa" element={
          <>
            <Hero />
            <Aloqa />
          </>
        } />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;