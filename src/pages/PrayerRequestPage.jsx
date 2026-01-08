import { useState, useEffect } from "react";
import { Heart, Quote, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PrayerRequestModal from "@/components/modals/PrayerRequestModal";
import { useSettings } from "@/contexts/SettingsContext";

export default function PrayerRequestPage() {
    const { settings } = useSettings();
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <Navbar />

            {/* Hero Section - Text Only */}
            <section className="relative min-h-[60vh] flex items-center justify-center text-center overflow-hidden">
                {/* Background Photo */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/prayer-congregation.jpg"
                        alt="Congregation in Prayer"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-900/40 to-neutral-950/60" />
                </div>

                {/* Content - Text Only */}
                <div className="relative z-10 container mx-auto px-6 py-24">
                    <div className="max-w-2xl mx-auto">
                        {/* Accent */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-12 h-[2px] bg-white/50" />
                            <span className="text-white/80 font-medium tracking-widest text-sm uppercase">
                                We're Here For You
                            </span>
                            <div className="w-12 h-[2px] bg-white/50" />
                        </div>

                        {/* Title */}
                        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                            Prayer Request
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-white/70 leading-relaxed max-w-lg mx-auto">
                            We believe in the power of prayer. Share your needs with our caring community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quote & CTA Section */}
            <section className="py-20 md:py-28 bg-secondary/30">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto text-center">
                        {/* Icon */}
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/20">
                            <Heart className="w-10 h-10 text-primary" />
                        </div>

                        {/* Bible Quote */}
                        <div className="relative mb-10">
                            <Quote className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                            <blockquote className="text-xl md:text-2xl italic text-muted-foreground leading-relaxed font-serif">
                                "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
                            </blockquote>
                            <footer className="mt-4 text-sm font-bold text-primary">
                                — Philippians 4:6
                            </footer>
                        </div>

                        {/* Supporting Text */}
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Our prayer team is ready to lift you up. Your requests are treated with confidentiality and care.
                        </p>

                        {/* CTA Button */}
                        <Button 
                            size="lg" 
                            onClick={() => setModalOpen(true)}
                            className="text-lg px-10 py-7 rounded-full shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Share Your Prayer
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Prayer Request Modal */}
            <PrayerRequestModal open={modalOpen} onOpenChange={setModalOpen} />
        </div>
    );
}
