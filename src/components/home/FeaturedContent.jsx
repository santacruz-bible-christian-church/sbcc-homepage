import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Heart, Loader2, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { formatDateBox } from "@/hooks";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

export default function FeaturedContent() {
    const [announcement, setAnnouncement] = useState(null);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [announcementsResult, eventsResult] = await Promise.allSettled([
                    api.getAnnouncements({ limit: 1 }),
                    api.getEvents({ limit: 1, timeFilter: 'upcoming' })
                ]);

                const announcementOk = announcementsResult.status === 'fulfilled';
                const eventOk = eventsResult.status === 'fulfilled';

                if (announcementOk) {
                    setAnnouncement(announcementsResult.value[0] || null);
                } else {
                    console.error("Failed to fetch featured announcement:", announcementsResult.reason);
                }

                if (eventOk) {
                    setEvent(eventsResult.value[0] || null);
                } else {
                    console.error("Failed to fetch featured event:", eventsResult.reason);
                }

                setHasError(!announcementOk && !eventOk);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <section id="featured" className="relative py-24 md:py-32 bg-secondary border-t border-border overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                     <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="h-4 w-32 bg-muted mx-auto mb-4 animate-pulse" />
                        <div className="h-10 w-64 bg-muted mx-auto mb-4 animate-pulse" />
                        <div className="h-5 w-48 bg-muted mx-auto animate-pulse" />
                    </div>
                </div>
            </section>
        );
    }

    const eventDate = event ? formatDateBox(event.date) : null;

    return (
        <section id="featured" className="relative py-32 md:py-40 bg-muted/30 border-t border-primary/10 overflow-hidden">
            {/* Massive Background Typography for Depth */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.5, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0"
            >
                <span className="font-serif text-[12rem] md:text-[20rem] leading-none text-foreground/5 opacity-50 whitespace-nowrap italic">
                    Connect
                </span>
            </motion.div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header - Floating & Overlapped */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative text-center mb-20 z-20"
                >
                     <span className="inline-block bg-primary text-background px-4 py-1 font-mono text-xs font-bold uppercase tracking-widest rotate-[-2deg] shadow-sm mb-6">
                        What's Happening
                    </span>
                    <h2 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 relative inline-block">
                        Stay Connected
                        {/* Scribble Underline */}
                        <motion.svg 
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                            className="absolute -bottom-2 left-0 w-full h-4 text-primary/40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M2.00026 6.99997C47.5611 1.63737 114.717 -2.48694 198 3.99997" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                        </motion.svg>
                    </h2>
                    <p className="font-sans text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                        The latest updates, events, and prayer needs from our community.
                    </p>
                </motion.div>

                {/* Scrapbook Grid - Messy & Overlapping */}
                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                >
                    
                    {/* Featured Announcement - Large Card (Tilted Left) */}
                    <motion.div variants={item} className="lg:col-span-7 group relative">
                        {/* Stacked "Archive" Photo - Only visible if we have a specific announcement photo */}
                        {announcement?.photo && (
                            <div className="absolute top-2 -left-3 w-full h-full bg-white border-[3px] border-white shadow-lg rotate-[-4deg] z-0 overflow-hidden transform scale-[0.98] group-hover:rotate-[-6deg] group-hover:-translate-x-4 transition-all duration-500">
                                <img src="/assets/worship-team.jpg" alt="Community" className="w-full h-full object-cover grayscale opacity-40 blur-[1px]" />
                                <div className="absolute bottom-4 left-4 font-mono text-[10px] text-black/50 rotate-[-2deg]">
                                    // ARCHIVE_IMG_01
                                </div>
                            </div>
                        )}

                        <div className="relative z-10 overflow-hidden bg-foreground text-background min-h-[500px] border-[3px] border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] lg:rotate-[-1deg] group-hover:rotate-0 group-hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,0.2)] group-hover:-translate-y-2 transition-all duration-500 ease-out">
                            {/* Background Image with Noise Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src={announcement?.photo || "/assets/worship-team.jpg"} 
                                    alt={announcement?.title || "Worship"} 
                                    className="w-full h-full object-cover grayscale opacity-50 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                {/* Noise Texture */}
                                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] mix-blend-overlay" />
                            </div>
                            
                            {/* Tape Label */}
                            <div className="absolute top-8 -left-2 bg-yellow-100/90 text-neutral-900 px-6 py-2 shadow-md rotate-[-3deg] z-20 backdrop-blur-sm">
                                <span className="font-mono text-sm font-bold uppercase tracking-wider">
                                    Latest Update
                                </span>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                                {announcement ? (
                                    <>
                                        <h3 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-[0.9]">
                                            {announcement.title}
                                        </h3>
                                        <div className="h-[1px] w-24 bg-white/50 mb-6" />
                                        <div 
                                            className="font-sans text-white/80 line-clamp-3 mb-8 max-w-lg text-lg prose prose-invert"
                                            dangerouslySetInnerHTML={{ __html: announcement.body }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <h3 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-[0.9]">
                                            Welcome to SBCC
                                        </h3>
                                        <div className="h-[1px] w-24 bg-white/50 mb-6" />
                                        <p className="font-sans text-white/80 mb-8 max-w-lg text-lg">
                                            A place to belong, believe, and become. Check back soon for community updates.
                                        </p>
                                    </>
                                )}
                                
                                <Button asChild className="w-fit rounded-none bg-white text-black hover:bg-neutral-200 uppercase font-mono text-xs tracking-wider border-0 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                                    <Link to="/announcements" className="flex items-center gap-2">
                                        Read More <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Stacked Cards (Tilted Right & Offset) */}
                    <div className="lg:col-span-5 flex flex-col gap-10 mt-12 lg:mt-24">
                        
                        {/* Next Event Card */}
                        <motion.div variants={item} className="group relative bg-background border-[3px] border-foreground p-8 flex flex-col shadow-[8px_8px_0px_0px_var(--primary)] lg:rotate-[1deg] hover:rotate-0 hover:shadow-[12px_12px_0px_0px_var(--primary)] hover:-translate-y-1 transition-all duration-300">
                             {/* Pin/Sticker Effect */}
                             <div className="absolute -top-4 right-8 w-4 h-4 rounded-full bg-red-500 shadow-sm z-20 border border-black/10" />

                            <div className="flex items-start justify-between mb-8">
                                <div className="w-14 h-14 border-2 border-primary bg-primary/5 flex items-center justify-center text-primary">
                                    <Calendar className="w-7 h-7" />
                                </div>
                                {eventDate && (
                                    <div className="text-center font-mono border-2 border-foreground p-2 min-w-[90px] rotate-3 bg-white shadow-sm">
                                        <div className="text-2xl font-bold leading-none">{eventDate.day}</div>
                                        <div className="text-xs uppercase font-bold tracking-widest">{eventDate.month}</div>
                                    </div>
                                )}
                            </div>
                            
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                Up Next
                            </span>
                            
                            {event ? (
                                <>
                                    <h3 className="font-serif text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-none">
                                        {event.title}
                                    </h3>
                                    <p className="font-mono text-xs text-muted-foreground mb-8 uppercase flex items-center gap-2">
                                        <MapPin className="w-3 h-3" />
                                        {event.location || 'Church Main Hall'}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3 className="font-serif text-3xl font-bold text-foreground mb-3 leading-none">
                                        Stay Tuned
                                    </h3>
                                    <p className="font-mono text-xs text-muted-foreground mb-8 uppercase">
                                        More events coming soon
                                    </p>
                                </>
                            )}
                            
                            <Link 
                                to="/events" 
                                className="mt-auto group/link inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors border-b-2 border-transparent hover:border-primary pb-1 w-fit"
                            >
                                See All Events <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                            </Link>
                        </motion.div>

                        {/* Prayer Request Card */}
                        <motion.div variants={item} className="group relative bg-primary text-primary-foreground border-2 border-primary p-8 flex flex-col shadow-[8px_8px_0px_0px_var(--foreground)] lg:rotate-[-2deg] hover:rotate-0 hover:shadow-[12px_12px_0px_0px_var(--foreground)] hover:-translate-y-1 transition-all duration-300">
                             {/* Tape Effect */}
                             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/20 backdrop-blur-sm -rotate-1 shadow-sm transform skew-x-12" />

                            <div className="w-12 h-12 border-2 border-primary-foreground/30 flex items-center justify-center mb-6 rounded-none">
                                <Heart className="w-6 h-6" />
                            </div>
                            
                            <span className="font-mono text-xs font-bold uppercase tracking-wider opacity-80 mb-3">Community</span>
                            <h3 className="font-serif text-3xl font-bold mb-3">
                                Need Prayer?
                            </h3>
                            <p className="font-sans text-primary-foreground/80 mb-8 leading-relaxed text-lg">
                                Life is heavy. Let us carry it with you.
                            </p>
                            
                            <Link 
                                to="/prayer" 
                                className="mt-auto inline-block border-2 border-primary-foreground text-center py-4 font-mono text-xs uppercase font-bold hover:bg-primary-foreground hover:text-primary transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                            >
                                Submit Request
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}


