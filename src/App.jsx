import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ROUTES } from "@/constants";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedContent from "@/components/home/FeaturedContent";
import Contact from "@/components/home/Contact";
import Schedule from "@/components/home/Schedule";
import Footer from "@/components/layout/Footer";
import AnnouncementsPage from "@/pages/AnnouncementsPage";
import EventsPage from "@/pages/EventsPage";
import AboutPage from "@/pages/AboutPage";
import PrayerRequestPage from "@/pages/PrayerRequestPage";

import PageWrapper from "@/components/layout/PageWrapper";

function HomePage() {
  return (
    <PageWrapper className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <FeaturedContent />
        <Schedule />
        <Contact />
      </main>
      <Footer />
    </PageWrapper>
  );
}

import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.ANNOUNCEMENTS} element={<AnnouncementsPage />} />
        <Route path={ROUTES.EVENTS} element={<EventsPage />} />
        <Route path={ROUTES.PRAYER} element={<PrayerRequestPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <SettingsProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </SettingsProvider>
  );
}

export default App;
