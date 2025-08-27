
import './App.css'

import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/portafolio" element={<Portfolio />} />
        <Route path="/portafolio/:id" element={<ProjectDetail />} />
        <Route path="/testimonios" element={<Testimonials />} />
        <Route path="/contacto" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App
