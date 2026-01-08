import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { formatDateBox } from "@/hooks";

export default function FeaturedContent() {
    const [announcement, setAnnouncement] = useState(null);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [announcements, events] = await Promise.all([
                    api.getAnnouncements({ limit: 1 }),
                    api.getEvents({ limit: 1, timeFilter: 'upcoming' })
                ]);
                setAnnouncement(announcements[0] || null);
                setEvent(events[0] || null);
            } catch (error) {
                console.error("Failed to fetch featured content:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <section id="featured" className="py-24 md:py-32 bg-secondary">
                <div className="container mx-auto px-6 flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </section>
        );
    }

    const eventDate = event ? formatDateBox(event.date) : null;

    return (
        <section id="featured" className="py-24 md:py-32 bg-secondary">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-[2px] bg-primary/30" />
                        <span className="text-primary font-medium tracking-widest text-sm uppercase">
                            What's Happening
                        </span>
                        <div className="w-12 h-[2px] bg-primary/30" />
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Stay Connected
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                        Join us in worship, fellowship, and service.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Featured Announcement - Large Card */}
                    <div className="lg:col-span-7 group relative overflow-hidden rounded-2xl bg-neutral-900 min-h-[400px]">
                        {/* Background */}
                        <div className="absolute inset-0">
                            <img 
                                src="/assets/worship-team.jpg" 
                                alt="Worship" 
                                className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/20" />
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-end p-8">
                            <span className="inline-flex w-fit items-center px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider mb-4">
                                Latest Announcement
                            </span>
                            
                            {announcement ? (
                                <>
                                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3 line-clamp-2">
                                        {announcement.title}
                                    </h3>
                                    <p className="text-white/70 line-clamp-2 mb-6 max-w-md">
                                        {announcement.body?.replace(/<[^>]*>/g, '').substring(0, 120)}...
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
                                        Welcome to SBCC
                                    </h3>
                                    <p className="text-white/70 mb-6 max-w-md">
                                        Check back soon for the latest news and updates from our church community.
                                    </p>
                                </>
                            )}
                            
                            <Button asChild className="w-fit rounded-full bg-white text-neutral-900 hover:bg-white/90">
                                <Link to="/announcements" className="flex items-center gap-2">
                                    View All
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Column - Stacked Cards */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Next Event Card */}
                        <div className="flex-1 group relative overflow-hidden rounded-2xl bg-white border border-border/50 p-6 flex flex-col hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                {eventDate && (
                                    <div className="text-right bg-primary/10 rounded-xl px-3 py-2">
                                        <div className="text-2xl font-bold text-primary leading-none">{eventDate.day}</div>
                                        <div className="text-xs font-medium text-primary/70">{eventDate.month}</div>
                                    </div>
                                )}
                            </div>
                            
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Upcoming Event</span>
                            {event ? (
                                <>
                                    <h3 className="font-serif text-lg font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-1 mb-4">
                                        {event.location || 'Church Venue'}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                                        Stay Tuned
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        More events coming soon!
                                    </p>
                                </>
                            )}
                            
                            <Link 
                                to="/events" 
                                className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                See All Events <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Prayer Request Card — Now uses primary colors */}
                        <div className="flex-1 group relative overflow-hidden rounded-2xl bg-primary/5 border border-primary/10 p-6 flex flex-col hover:shadow-lg hover:bg-primary/10 transition-all duration-300">
                            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                <Heart className="w-5 h-5" />
                            </div>
                            
                            <span className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-2">Prayer Request</span>
                            <h3 className="font-serif text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                We're Here For You
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Share your prayer needs with our caring community.
                            </p>
                            
                            <Link 
                                to="/prayer" 
                                className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                Submit Request <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
