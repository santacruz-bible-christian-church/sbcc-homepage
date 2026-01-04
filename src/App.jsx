import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Announcements from "@/components/Announcements";
import PrayerRequest from "@/components/PrayerRequest";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnnouncementsPage from "@/pages/AnnouncementsPage";

function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Announcements />
        <PrayerRequest />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

