import { useState, useEffect, useRef } from "react";
import { MapPin, Clock, CalendarDays, Ticket, Music, Mic2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    useEvents,
    useScrollToTop,
    formatDateBoxExtended,
    formatTime,
} from "@/hooks";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, scale: 0.9, rotate: -2 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 50 } }
};

const POSTER_COLORS = [
    "bg-[#FF00FF] text-black", // Hot Pink
    "bg-[#00FFFF] text-black", // Cyan
    "bg-[#FFFF00] text-black", // Neon Yellow
    "bg-[#FF3300] text-black", // Bright Red
    "bg-white text-black",     // Stark White
    "bg-black text-white",     // Inverted
];

const ROTATIONS = [
    "lg:rotate-1",
    "lg:-rotate-1",
    "lg:rotate-2",
    "lg:-rotate-2",
    "lg:rotate-0",
];

import PageWrapper from "@/components/layout/PageWrapper";

export default function EventsPage() {
    useScrollToTop();
    const { events, loading, error, groupEventsByMonth } = useEvents({ limit: 50, timeFilter: 'all' });
    
    // Group events
    const eventGroups = groupEventsByMonth(events);

    // Function to get consistent random traits based on event ID
    const getPosterTraits = (id) => {
        const idNum = typeof id === 'string' ? id.charCodeAt(0) : id;
        const colorIndex = idNum % POSTER_COLORS.length;
        const rotateIndex = idNum % ROTATIONS.length;
        return {
            color: POSTER_COLORS[colorIndex],
            rotation: ROTATIONS[rotateIndex]
        };
    };

    return (
        <PageWrapper className="min-h-screen bg-neutral-900 font-sans antialiased overflow-x-hidden selection:bg-pink-500 selection:text-white">
            <Navbar />

            {/* HEADER: Street Wall */}
            <section className="relative pt-32 pb-16 px-6 border-b border-neutral-800">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
                        <h1 className="text-[15vw] md:text-[8vw] leading-[0.8] font-black tracking-tighter text-white uppercase break-all">
                            UPCOMING<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 animate-pulse">
                                GIGS & EVENTS
                            </span>
                        </h1>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm font-mono text-neutral-400 uppercase tracking-widest border-t border-neutral-800 pt-6">
                        <span className="flex items-center gap-2">
                             <Ticket className="w-4 h-4 text-pink-500" />
                             SBCC Community Board
                        </span>
                        <span className="hidden md:inline text-neutral-700">|</span>
                        <span>Est. 1992</span>
                        <span className="hidden md:inline text-neutral-700">|</span>
                        <span className="animate-pulse text-green-500">POST NO BILLS</span>
                    </div>
                </div>
            </section>

            {/* CONTENT: The Wall */}
            <section className="py-12 px-4 md:px-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-95">
                <div className="container mx-auto max-w-7xl">
                    {loading ? (
                        <div className="text-white font-mono text-center animate-pulse text-2xl">
                            PASTING UP FLYERS...
                        </div>
                    ) : eventGroups.length === 0 ? (
                        <div className="text-white font-mono text-center text-xl border-4 border-white p-10 lg:rotate-1 max-w-lg mx-auto">
                            NO UPCOMING SHOWS. CHECK BACK SOON.
                        </div>
                    ) : (
                        <div className="space-y-20">
                            {eventGroups.map((group) => (
                                <div key={group.key}>
                                    {/* Month Header (Spray Paint Stencil Style) */}
                                    <div className="mb-8 flex items-center gap-4">
                                        <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-white bg-opacity-10 stroke-2 stroke-white uppercase tracking-tighter opacity-30 select-none">
                                            {group.label.split(' ')[0]}
                                        </h2>
                                        <div className="h-px bg-neutral-800 flex-grow"></div>
                                    </div>

                                    <motion.div 
                                        variants={container}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                        className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                                    >
                                        {group.events.map((event) => {
                                            const traits = getPosterTraits(event.id);
                                            const dateObj = formatDateBoxExtended(event.date);
                                            const time = formatTime(event.date);

                                            return (
                                                <motion.article 
                                                    key={event.id}
                                                    variants={item}
                                                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, transition: { type: "spring", stiffness: 300 } }}
                                                    className={`relative group break-inside-avoid mb-6`}
                                                >
                                                    {/* Tape Effect */}
                                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/20 backdrop-blur-sm shadow-sm rotate-2 z-20"></div>

                                                    <div className={`p-6 shadow-2xl ${traits.color} ${traits.rotation} pb-16`}>
                                                        <div className="border-4 border-current p-4 h-full flex flex-col justify-between">
                                                            
                                                            {/* Header: Date */}
                                                            <div className="flex justify-between items-start mb-6 border-b-2 border-current pb-4">
                                                                <div className="flex flex-col leading-none">
                                                                    <span className="text-xs font-bold uppercase tracking-widest mb-1">{dateObj.month}</span>
                                                                    <span className="text-6xl font-black tracking-tighter">{dateObj.day}</span>
                                                                </div>
                                                                <div className="text-right font-mono text-xs font-bold uppercase">
                                                                    {dateObj.year}
                                                                </div>
                                                            </div>

                                                            {/* Content: Title & Info */}
                                                            <div className="mb-8">
                                                                <h2 className="text-4xl leading-[0.9] font-black uppercase mb-4 break-words hyphens-auto">
                                                                    {event.title}
                                                                </h2>
                                                                
                                                                {event.description && (
                                                                    <p className="font-mono text-xs uppercase leading-relaxed line-clamp-4 border-l-2 border-current pl-3">
                                                                        {event.description}
                                                                    </p>
                                                                )}
                                                            </div>

                                                            {/* Footer: Details */}
                                                            <div className="space-y-2 font-bold uppercase text-sm tracking-tight">
                                                                {time && (
                                                                    <div className="flex items-center gap-2">
                                                                        <Clock className="w-4 h-4 flex-shrink-0" />
                                                                        <span>DOORS: {time}</span>
                                                                    </div>
                                                                )}
                                                                {event.location && (
                                                                    <div className="flex items-center gap-2">
                                                                        <MapPin className="w-4 h-4 flex-shrink-0" />
                                                                        <span className="truncate">{event.location}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Tear-off Tabs (Bottom) */}
                                                        <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 pb-1 overflow-hidden">
                                                            {[...Array(6)].map((_, i) => (
                                                                <div key={i} className="w-[14%] h-12 border-l border-r border-dashed border-current flex items-end justify-center pb-2 opacity-50 text-[8px] font-mono hover:bg-black/10 hover:opacity-100 transition-all cursor-pointer">
                                                                    <span className="-rotate-90 origin-bottom translate-y-2">TAKE ONE</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.article>
                                            );
                                        })}
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </PageWrapper>
    );
}
