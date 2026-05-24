import { useState, useEffect } from "react";
import { Ticket } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEvents, useScrollToTop, formatDateBoxExtended, formatTime } from "@/hooks";
import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import EventPoster from "@/components/events/EventPoster";
import ClippedTicketToast from "@/components/events/ClippedTicketToast";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

export default function EventsPage() {
    useScrollToTop();
    const { events, loading, error, groupEventsByMonth } = useEvents({ limit: 50, timeFilter: 'all' });
    
    // Group events
    const eventGroups = groupEventsByMonth(events);

    // Dynamic states for tickets and receipt toast
    const [tornTabs, setTornTabs] = useState({}); // { [eventId]: [tabIndex, tabIndex...] }
    const [toast, setToast] = useState(null); // { title: string, event: string, date: string }

    // Clear toast automatically
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    // Handler for tearing off a tab
    const handleTearOff = async (event, tabIndex) => {
        const eventId = event.id;
        
        // Guard if already torn
        if (tornTabs[eventId]?.includes(tabIndex)) return;

        const dateObj = formatDateBoxExtended(event.date);
        const time = formatTime(event.date);

        // Copy event info to clipboard
        const shareText = `🎫 SBCC EVENT FLYER\n\n📌 Event: ${event.title}\n📅 Date: ${dateObj.month} ${dateObj.day}, ${dateObj.year}\n⏰ Time: ${time || "TBA"}\n📍 Location: ${event.location || "Church Main Hall"}\n\nJoin us at Santa Cruz Bible Christian Church!`;
        
        try {
            await navigator.clipboard.writeText(shareText);
        } catch (err) {
            console.error("Failed to copy text:", err);
        }

        // Add to torn tabs state
        setTornTabs(prev => ({
            ...prev,
            [eventId]: [...(prev[eventId] || []), tabIndex]
        }));

        // Set visual receipt toast
        setToast({
            title: "Ticket Torn!",
            event: event.title,
            date: `${dateObj.month} ${dateObj.day}`
        });
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
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400">
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
                        <span className="text-green-500">POST NO BILLS</span>
                    </div>
                </div>
            </section>

            {/* CONTENT: The Wall */}
            <section className="py-12 px-4 md:px-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-95 relative">
                <div className="container mx-auto max-w-7xl">
                    {loading ? (
                        <div className="text-white font-mono text-center animate-pulse text-2xl py-20">
                            PASTING UP FLYERS...
                        </div>
                    ) : eventGroups.length === 0 ? (
                        <div className="text-white font-mono text-center text-xl border-4 border-white p-10 lg:rotate-1 max-w-lg mx-auto my-20">
                            NO UPCOMING SHOWS. CHECK BACK SOON.
                        </div>
                    ) : (
                        <div className="space-y-20">
                            {eventGroups.map((group) => (
                                <div key={group.key}>
                                    {/* Month Header (Spray Paint Stencil Style) */}
                                    <div className="mb-8 flex items-center gap-4">
                                        <h2 
                                            className="text-6xl md:text-8xl font-black text-transparent uppercase tracking-tighter opacity-20 select-none transition-all duration-300 hover:opacity-50 hover:scale-105 cursor-default"
                                            style={{
                                                WebkitTextStroke: "2px rgba(255,255,255,0.4)",
                                                textShadow: "0 0 12px rgba(255,255,255,0.2)"
                                            }}
                                        >
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
                                        {group.events.map((event) => (
                                            <EventPoster
                                                key={event.id}
                                                event={event}
                                                tornTabs={tornTabs[event.id] || []}
                                                onTearOff={handleTearOff}
                                            />
                                        ))}
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />

            {/* Custom Floating Receipt Toast */}
            <ClippedTicketToast toast={toast} onClose={() => setToast(null)} />
        </PageWrapper>
    );
}
