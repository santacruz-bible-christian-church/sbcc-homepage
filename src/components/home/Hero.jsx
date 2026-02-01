import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
    const { settings } = useSettings();
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Parallax Transforms (Conditional)
    const yText = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : -50]);
    const yBack = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : 20]);
    const yMain = useTransform(scrollY, [0, 500], [0, 0]);
    const yOverlay = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : -100]);

    // Parse service time for visual display if possible, otherwise fallback
    const serviceTime = settings.service_schedule?.split(':')[1]?.trim() + ':' + settings.service_schedule?.split(':')[2]?.trim() || "10:00 AM";
    const serviceDay = settings.service_schedule?.split(' ')[0] || "Sun";

    return (
        <section id="home" className="relative w-full bg-background overflow-hidden flex items-center pt-24 pb-12 lg:min-h-[90vh] lg:pt-32 lg:pb-20">
            {/* Background Texture Intersections */}
            <div className="absolute top-0 right-0 w-1/3 h-full border-l border-border opacity-50 pointer-events-none" />
            <div className="absolute top-1/3 left-0 w-full h-[1px] bg-border opacity-50 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-0 relative">
                    
                    {/* 1. Typography Column */}
                    {/* Mobile: Order 1 */}
                    <div className="flex flex-col items-start z-20 pointer-events-none mb-12 lg:mb-0 lg:col-span-7">
                        
                        {/* Metadata - Floating Label */}
                        <motion.div 
                            style={{ y: yText }}
                            className="mb-6 lg:mb-8 flex items-center gap-4 pointer-events-auto"
                        >
                            <div className="bg-primary text-background px-3 py-1 font-mono text-[10px] lg:text-xs uppercase tracking-widest rotate-2 shadow-sm truncate max-w-[200px]">
                                {settings.address || "Santa Cruz, CA"}
                            </div>
                            <span className="font-mono text-[10px] lg:text-xs uppercase tracking-widest text-muted-foreground">
                                // {serviceDay} {serviceTime}
                            </span>
                        </motion.div>

                        {/* Main Heading - Massive & Broken */}
                        <motion.h1 
                            style={{ y: yText }}
                            className="relative font-serif text-6xl md:text-8xl lg:text-[10rem] leading-[0.8] text-foreground mb-8 lg:mb-8 tracking-tighter drop-shadow-xl"
                        >
                            <span className="block italic ml-1 lg:ml-4 text-foreground/80 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">Welcome</span>
                            <span className="block font-bold mt-2 lg:-mr-32 relative z-30 drop-shadow-[0_0_20px_rgba(240,230,210,0.9)]">
                                Home.
                                {/* Scribble decoration */}
                                <svg className="absolute -bottom-2 right-0 w-24 lg:-bottom-4 lg:w-32 h-12 text-accent" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 15C20 10 50 5 95 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </motion.h1>

                        {/* Manifesto Text - Narrow Column */}
                        <motion.div 
                            style={{ y: yText }}
                            className="pointer-events-auto w-full md:max-w-md bg-white/90 backdrop-blur-md p-6 border-l-4 border-primary shadow-xl lg:ml-12 relative z-30 ring-1 ring-black/5"
                        >
                            <h2 className="font-serif text-xl text-primary italic mb-2">
                                {settings.church_name}
                            </h2>
                            <p className="font-sans text-muted-foreground leading-relaxed text-sm md:text-base">
                                {settings.tagline}
                            </p>
                            
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Button asChild className="rounded-none bg-primary text-background hover:bg-primary/90 font-mono text-xs uppercase tracking-wider h-auto py-3 px-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                                    <a href="#featured">Explore</a>
                                </Button>
                                <Button asChild variant="ghost" className="rounded-none text-foreground font-mono text-xs uppercase hover:bg-transparent hover:underline decoration-2 underline-offset-4">
                                    <Link to="/about">I am New here</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* 2. Visuals Column */}
                    {/* Mobile: Order 2 (Stacked Underneath) */}
                    <div className="relative h-[400px] w-full lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-1/2 lg:h-[70vh] z-10 pointer-events-auto mt-8 lg:mt-0">
                         <div className="relative w-full h-full">
                            
                            {/* Main Detail Image - Rotated & Hard */}
                            <motion.div 
                                style={{ y: yBack }}
                                className="absolute top-0 right-0 w-full md:w-4/5 h-full lg:top-10 lg:right-16 lg:h-4/5 border-[3px] border-foreground bg-muted shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] -rotate-2 lg:-rotate-3 hover:rotate-0 transition-transform duration-700"
                            >
                                <img 
                                    src="/assets/hero-worship.jpg" 
                                    alt="Worship Service" 
                                    className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
                            </motion.div>

                            {/* Secondary Image - Overlapping Top Left */}
                            <motion.div 
                                style={{ y: yMain }}
                                className="absolute -top-6 left-0 w-32 h-32 md:w-48 md:h-48 lg:-top-4 lg:-left-12 lg:w-64 lg:h-64 border-2 border-background bg-background shadow-xl rotate-3 lg:rotate-6 hover:rotate-3 transition-transform duration-500 z-20"
                            >
                                <img 
                                    src="/assets/prayer-congregation.jpg" 
                                    alt="Community Gathering" 
                                    className="w-full h-full object-cover grayscale sepia-[0.3]" 
                                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop'}
                                />
                                {/* Tape */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 lg:w-16 h-4 lg:h-6 bg-yellow-100/80 shadow-sm rotate-2" />
                            </motion.div>

                            {/* Floating Ticket/Sticker - Dynamic Data */}
                            <motion.div 
                                style={{ y: yOverlay }}
                                className="absolute -bottom-4 right-4 lg:bottom-12 lg:left-0 lg:right-auto bg-primary text-background p-3 lg:p-4 w-28 lg:w-32 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] rotate-[-3deg] lg:rotate-[-6deg] z-30"
                            >
                                <span className="block font-mono text-[8px] lg:text-[10px] uppercase">Service</span>
                                <span className="block font-serif text-lg lg:text-2xl italic font-bold">{serviceDay || 'Sun'}</span>
                                <span className="block font-mono text-[10px] lg:text-xs">{serviceTime || '10:00 AM'}</span>
                            </motion.div>

                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
