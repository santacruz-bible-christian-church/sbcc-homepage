import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ROUTES } from "@/constants";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedContent from "@/components/home/FeaturedContent";
import Contact from "@/components/home/Contact";
import Footer from "@/components/layout/Footer";
import AnnouncementsPage from "@/pages/AnnouncementsPage";
import EventsPage from "@/pages/EventsPage";
import AboutPage from "@/pages/AboutPage";
import PrayerRequestPage from "@/pages/PrayerRequestPage";

function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <FeaturedContent />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.ANNOUNCEMENTS} element={<AnnouncementsPage />} />
          <Route path={ROUTES.EVENTS} element={<EventsPage />} />
          <Route path={ROUTES.PRAYER} element={<PrayerRequestPage />} />
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;
