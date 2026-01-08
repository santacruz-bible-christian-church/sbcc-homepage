import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowRight, Loader2, CalendarDays, CheckCircle } from "lucide-react";
import { api } from "@/services/api";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await api.getEvents({ limit: 4, timeFilter: 'all' });
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Helper to format date
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return { month: '---', day: '--', weekday: '---' };
            }
            return {
                month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
                day: date.getDate().toString(),
                weekday: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
            };
        } catch {
            return { month: '---', day: '--', weekday: '---' };
        }
    };

    // Helper to format time
    const formatTime = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return null;
            return date.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
        } catch {
            return null;
        }
    };

    // Helper to check if event is past
    const isPastEvent = (dateString) => {
        try {
            const eventDate = new Date(dateString);
            const now = new Date();
            return eventDate < now;
        } catch {
            return false;
        }
    };

    // Helper to check if event is today
    const isToday = (dateString) => {
        try {
            const eventDate = new Date(dateString);
            const now = new Date();
            return eventDate.toDateString() === now.toDateString();
        } catch {
            return false;
        }
    };

    // Event type labels
    const eventTypeLabels = {
        service: 'Sunday Service',
        bible_study: 'Bible Study',
        prayer_meeting: 'Prayer Meeting',
        fellowship: 'Fellowship',
        outreach: 'Outreach',
        other: 'Event'
    };

    // Find the next upcoming event
    const nextEventId = events.find(e => !isPastEvent(e.date))?.id;

    return (
        <section id="events" className="py-24 bg-gradient-to-b from-white to-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h4 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Church Activities</h4>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Events</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        Join us for worship, fellowship, and community activities.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <CalendarDays className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground text-lg">No events at this time. Check back soon!</p>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto">
                        {/* Timeline Container */}
                        <div className="relative">
                            {/* Vertical Timeline Line */}
                            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-muted" />

                            {/* Events */}
                            <div className="space-y-6">
                                {events.map((event, index) => {
                                    const dateObj = formatDate(event.date);
                                    const time = formatTime(event.date);
                                    const isPast = isPastEvent(event.date);
                                    const isNextEvent = event.id === nextEventId;
                                    const eventIsToday = isToday(event.date);

                                    return (
                                        <div 
                                            key={event.id}
                                            className="relative pl-16 md:pl-20 animate-in fade-in slide-in-from-left-4"
                                            style={{ 
                                                animationDelay: `${index * 100}ms`,
                                                animationFillMode: 'backwards'
                                            }}
                                        >
                                            {/* Timeline Node */}
                                            <div className={`absolute left-3.5 md:left-5.5 top-1 w-5 h-5 rounded-full border-4 transition-colors ${
                                                isPast 
                                                    ? 'bg-muted border-muted-foreground/30' 
                                                    : isNextEvent
                                                        ? 'bg-primary border-white shadow-lg shadow-primary/50 animate-pulse'
                                                        : 'bg-primary border-white shadow-lg shadow-primary/30'
                                            }`} />

                                            {/* Date Badge */}
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-2 ${
                                                isPast 
                                                    ? 'bg-muted text-muted-foreground' 
                                                    : isNextEvent
                                                        ? 'bg-primary text-white shadow-md'
                                                        : 'bg-primary/90 text-white'
                                            }`}>
                                                <span>{dateObj.month} {dateObj.day}</span>
                                                <span className="opacity-70">•</span>
                                                <span>{dateObj.weekday}</span>
                                                {isPast && (
                                                    <>
                                                        <span className="opacity-70">•</span>
                                                        <CheckCircle className="w-3 h-3" />
                                                    </>
                                                )}
                                            </div>

                                            {/* Event Card */}
                                            <div className={`p-4 rounded-xl border transition-all duration-300 ${
                                                isPast 
                                                    ? 'bg-muted/30 border-border/30' 
                                                    : isNextEvent
                                                        ? 'bg-white border-l-4 border-l-primary border-t border-r border-b border-border/50 shadow-lg'
                                                        : 'bg-white border-l-4 border-l-primary/30 border-t border-r border-b border-border/50 hover:border-primary/30 hover:shadow-md'
                                            }`}>
                                                <h3 className={`text-lg font-bold font-serif mb-2 ${
                                                    isPast ? 'text-muted-foreground' : 'text-foreground'
                                                }`}>
                                                    {event.title}
                                                </h3>

                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                                    {time && (
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span>{time}</span>
                                                        </div>
                                                    )}
                                                    {event.location && (
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="w-3.5 h-3.5" />
                                                            <span>{event.location}</span>
                                                        </div>
                                                    )}
                                                    {event.event_type && !isPast && (
                                                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                                                            {eventTypeLabels[event.event_type] || event.event_type}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-12 text-center">
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                        <Link to="/events" className="flex items-center gap-2">
                            View All Events
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
