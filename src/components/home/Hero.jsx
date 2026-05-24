import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import { useServiceSchedule } from "@/hooks";
import { Link } from "react-router-dom";
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

    // Parallax Transforms (Conditional for desktop)
    const yText = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : -40]);
    const yBack = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : 15]);
    const yMain = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : -10]);
    const yOverlay = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : -35]);

    const { day: serviceDay, time: serviceTime } = useServiceSchedule(settings.service_schedule);

    return (
        <section id="home" className="relative w-full bg-background overflow-hidden flex items-center pt-24 pb-16 lg:min-h-[90vh] lg:pt-32 lg:pb-24">
            {/* Background Texture Intersections */}
            <div className="absolute top-0 right-0 w-1/3 h-full border-l border-border opacity-50 pointer-events-none" />
            <div className="absolute top-1/3 left-0 w-full h-[1px] bg-border opacity-50 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative">
                    
                    {/* 1. Typography Column */}
                    <div className="flex flex-col items-start z-20 mb-6 lg:mb-0 lg:col-span-6 space-y-6">
                        
                        {/* Metadata - Floating Label */}
                        <motion.div 
                            style={{ y: yText }}
                            className="flex items-center gap-4"
                        >
                            <div className="bg-primary text-background px-3 py-1 font-mono text-[10px] lg:text-xs uppercase tracking-widest rotate-2 shadow-sm truncate max-w-[200px]">
                                {settings.address || "Santa Cruz, CA"}
                            </div>
                            <span className="font-mono text-[10px] lg:text-xs uppercase tracking-widest text-muted-foreground">
                                // SBCC WORSHIP BROADCAST
                            </span>
                        </motion.div>

                        {/* Main Heading - Massive & Broken */}
                        <motion.h1 
                            style={{ y: yText }}
                            className="relative font-serif text-6xl md:text-8xl lg:text-[9.5rem] leading-[0.8] text-foreground tracking-tighter drop-shadow-xl w-full"
                        >
                            <span className="block italic ml-1 lg:ml-4 text-foreground/80 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">Welcome</span>
                            <span className="inline-block font-bold mt-2 relative z-30 drop-shadow-[0_0_20px_rgba(240,230,210,0.9)]">
                                Home.
                                <svg className="absolute -bottom-6 lg:-bottom-4 -left-[5%] w-[110%] h-12 text-amber-600" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 15C20 10 50 5 95 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </motion.h1>

                        {/* Manifesto Text - Styled as a Library Drawer Index Card */}
                        <motion.div 
                            style={{
                                y: yText,
                                backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)",
                                backgroundSize: "16px 16px"
                            }}
                            className="w-full md:max-w-xl bg-[#FAF7F0] border-2 border-primary border-dashed shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8 relative lg:ml-4 overflow-hidden"
                        >
                            {/* Circular Ink Stamp Visual in Corner */}
                            <div className="absolute -top-3 -right-3 w-24 h-24 border-2 border-red-600/30 rounded-full flex items-center justify-center rotate-12 select-none pointer-events-none mix-blend-multiply opacity-50">
                                <div className="w-20 h-20 border border-dashed border-red-600/20 rounded-full flex items-center justify-center flex-col text-red-600 leading-none">
                                    <span className="font-mono text-[7px] font-bold tracking-widest">APPROVED</span>
                                    <span className="font-serif text-sm font-bold italic my-0.5">SBCC</span>
                                    <span className="font-mono text-[6px] tracking-wider">EST. 1992</span>
                                </div>
                            </div>

                            <div className="relative z-10 space-y-4">
                                <div className="border-b border-primary/20 pb-2">
                                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-bold block mb-1">
                                        // OFFICIAL RECORD
                                    </span>
                                    <h2 className="font-serif text-2xl text-primary font-bold italic">
                                        {settings.church_name}
                                    </h2>
                                </div>
                                
                                <p className="font-sans text-neutral-700 leading-relaxed text-sm md:text-base border-l-2 border-primary/20 pl-4 py-1 italic">
                                    "{settings.tagline}"
                                </p>
                                
                                <div className="pt-4 flex flex-wrap gap-4 border-t border-primary/20">
                                    <Button asChild className="rounded-none bg-primary text-background hover:bg-primary/90 font-mono text-xs uppercase tracking-wider h-auto py-3 px-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
                                        <a href="#featured">Explore</a>
                                    </Button>
                                    <Button asChild variant="ghost" className="rounded-none text-foreground font-mono text-xs uppercase hover:bg-transparent hover:underline decoration-2 underline-offset-4 cursor-pointer">
                                        <Link to="/about">I am New here</Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 2. Visuals Column - Scrapbook Collage Board */}
                    <div className="relative w-full lg:col-span-6 z-10 mt-8 lg:mt-0 flex items-center justify-center min-h-[420px] md:min-h-[500px]">
                         <div className="relative w-full aspect-[4/3] max-w-lg">
                            
                            {/* Layer 1: Main Polaroid Frame - Rotated & Hard Shadow */}
                            <motion.div 
                                style={{ y: yBack }}
                                className="absolute top-8 right-6 w-[85%] h-[85%] border-[3px] border-foreground bg-white p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] -rotate-3 hover:rotate-0 transition-transform duration-500 z-10 flex flex-col"
                            >
                                {/* Tape Overlay Holding Polaroid */}
                                <div className="absolute -top-4 left-1/3 w-28 h-6 bg-yellow-100/60 backdrop-blur-sm border-l border-r border-black/5 -rotate-2 shadow-sm z-20 mix-blend-multiply" />
                                
                                <div className="w-full flex-grow bg-neutral-100 overflow-hidden relative border border-neutral-200">
                                    <img 
                                        src="/assets/hero-worship.jpg" 
                                        alt="Worship Service" 
                                        className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?q=80&w=2074&auto=format&fit=crop';
                                        }}
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
                                </div>
                                
                                <div className="pt-4 pb-2 text-center font-mono text-xs uppercase tracking-widest text-neutral-500 font-bold italic rotate-[-1deg]">
                                    // Snapshot #01: Sunday Service
                                </div>
                            </motion.div>

                            {/* Layer 2: Secondary Overlapping Photo - Slanted Left */}
                            <motion.div 
                                style={{ y: yMain }}
                                className="absolute -top-6 -left-4 w-44 h-44 border-[2px] border-foreground bg-white p-2 shadow-lg rotate-6 hover:rotate-2 transition-transform duration-500 z-20 hidden sm:block"
                            >
                                {/* Pinned Tape */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-yellow-100/70 border-l border-r border-black/5 rotate-12 shadow-sm mix-blend-multiply" />
                                
                                <div className="w-full h-full bg-neutral-100 overflow-hidden relative">
                                    <img 
                                        src="/assets/prayer-congregation.jpg" 
                                        alt="Community Gathering" 
                                        className="w-full h-full object-cover grayscale sepia-[0.2]" 
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop';
                                        }}
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
                                </div>
                            </motion.div>

                            {/* Layer 3: Brutalist Perforated Ticket Stub - Neon Accent */}
                            <motion.div 
                                style={{ y: yOverlay }}
                                className="absolute -bottom-4 right-0 bg-[#FFFF00] text-black border-2 border-black p-4 w-48 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[-5deg] hover:rotate-0 transition-all duration-300 z-30 font-mono flex flex-col justify-between select-none"
                            >
                                <div className="flex justify-between items-center text-[8px] font-bold tracking-widest text-black/50 border-b border-black/10 pb-1.5 mb-2">
                                    <span>ADMIT ONE</span>
                                    <span>NO. 1992</span>
                                </div>
                                
                                <div className="space-y-1">
                                    <span className="block font-serif text-[11px] font-black uppercase tracking-tight italic">
                                        Worship Ticket
                                    </span>
                                    <div className="text-lg font-black tracking-tight leading-none">
                                        {serviceDay}
                                    </div>
                                    <div className="text-[10px] font-bold leading-tight truncate">
                                        {serviceTime}
                                    </div>
                                </div>
                                
                                {/* Perforated Tear Line */}
                                <div className="border-t border-dashed border-black/40 my-3 relative">
                                    <div className="absolute -left-6 -top-1.5 w-3 h-3 rounded-full bg-white border border-black" />
                                    <div className="absolute -right-6 -top-1.5 w-3 h-3 rounded-full bg-white border border-black" />
                                </div>

                                <div className="flex justify-between items-end">
                                    <span className="text-[8px] font-bold text-black/60 tracking-wider">JOIN US LIVE</span>
                                    <span className="text-[9px] font-black tracking-widest border border-black px-1.5 py-0.5 bg-black text-[#FFFF00]">
                                        FREE
                                    </span>
                                </div>

                                {/* Simulated Barcode */}
                                <div className="mt-3 flex items-center justify-between h-5 opacity-80" title="BARCODE">
                                    <div className="flex gap-[1px] items-stretch h-full w-full">
                                        {[1, 3, 1, 2, 4, 1, 2, 3, 1, 2, 4, 1, 1, 2, 3, 1].map((w, idx) => (
                                            <div key={idx} className="bg-black" style={{ flexGrow: w }} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
