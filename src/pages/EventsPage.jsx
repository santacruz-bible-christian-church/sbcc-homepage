import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ArrowLeft, Loader2, Home, CalendarDays, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";
import { api } from "@/services/api";

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeMonth, setActiveMonth] = useState(null);
    const sectionRefs = useRef({});

    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await api.getEvents({ limit: 50, timeFilter: 'all' });
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
                return { month: '---', day: '--', weekday: '---', monthYear: '' };
            }
            return {
                month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
                day: date.getDate().toString(),
                weekday: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
                monthYear: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            };
        } catch {
            return { month: '---', day: '--', weekday: '---', monthYear: '' };
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

    // Count upcoming and past events
    const upcomingCount = events.filter(e => !isPastEvent(e.date)).length;
    const pastCount = events.filter(e => isPastEvent(e.date)).length;

    // Find the next upcoming event
    const nextEventId = events.find(e => !isPastEvent(e.date))?.id;

    // Group events by month
    const groupEventsByMonth = (events) => {
        const groups = {};
        events.forEach(event => {
            const date = new Date(event.date);
            const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;
            if (!groups[key]) {
                groups[key] = {
                    key,
                    label: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                    shortLabel: date.toLocaleDateString('en-US', { month: 'short' }),
                    year: date.getFullYear(),
                    events: [],
                    isPast: isPastEvent(event.date)
                };
            }
            groups[key].events.push(event);
            // Update isPast based on any upcoming events in this month
            if (!isPastEvent(event.date)) {
                groups[key].isPast = false;
            }
        });
        return Object.values(groups).sort((a, b) => b.key.localeCompare(a.key));
    };

    const eventGroups = groupEventsByMonth(events);

    // Set initial active month
    useEffect(() => {
        if (eventGroups.length > 0 && !activeMonth) {
            // Find first month with upcoming events, or first month overall
            const upcomingMonth = eventGroups.find(g => !g.isPast);
            setActiveMonth(upcomingMonth?.key || eventGroups[0].key);
        }
    }, [eventGroups, activeMonth]);

    // Scroll spy - track which section is in view
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            
            for (const group of eventGroups) {
                const element = sectionRefs.current[group.key];
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveMonth(group.key);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [eventGroups]);

    // Scroll to section
    const scrollToSection = (key) => {
        // Immediately set active month for instant feedback
        setActiveMonth(key);
        
        const element = sectionRefs.current[key];
        if (element) {
            const offset = 150; // Increased offset to account for sticky header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <main>
                {/* Header */}
                <section className="py-12 md:py-16 bg-gradient-to-b from-secondary/50 to-white border-b border-border/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            {/* Title Row with Back Button */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                <div className="flex items-center gap-4">
                                    <Link 
                                        to="/" 
                                        className="w-10 h-10 rounded-full bg-white border border-border/50 shadow-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                        title="Back to Home"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </Link>
                                    <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                                        Events
                                    </h1>
                                </div>
                                
                                {/* Count Badge */}
                                {!loading && events.length > 0 && (
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        {upcomingCount > 0 && (
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 bg-primary rounded-full" />
                                                {upcomingCount} upcoming
                                            </span>
                                        )}
                                        {pastCount > 0 && (
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full" />
                                                {pastCount} completed
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            <p className="text-muted-foreground text-lg max-w-xl pl-14 sm:pl-14">
                                Join us for worship, fellowship, and community activities.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mobile Month Tabs */}
                {!loading && eventGroups.length > 0 && (
                    <div className="lg:hidden sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-border/30 shadow-sm">
                        <div className="container mx-auto px-4">
                            <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
                                {eventGroups.map((group) => (
                                    <button
                                        key={group.key}
                                        onClick={() => scrollToSection(group.key)}
                                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                            activeMonth === group.key
                                                ? 'bg-primary text-white shadow-md'
                                                : group.isPast
                                                    ? 'bg-muted/50 text-muted-foreground hover:bg-muted'
                                                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                                        }`}
                                    >
                                        {group.shortLabel}
                                        <span className={`ml-1.5 text-xs ${
                                            activeMonth === group.key ? 'text-white/80' : 'text-muted-foreground'
                                        }`}>
                                            {group.events.length}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Events Timeline with Sidebar */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                                <p className="text-muted-foreground text-sm">Loading events...</p>
                            </div>
                        ) : events.length === 0 ? (
                            <div className="text-center py-20 max-w-md mx-auto">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CalendarDays className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-serif font-bold mb-3">No Events</h3>
                                <p className="text-muted-foreground mb-8">
                                    There are no events at this time. Check back soon!
                                </p>
                                <Button asChild size="lg" className="rounded-full px-8">
                                    <Link to="/" className="flex items-center gap-2">
                                        <Home className="w-4 h-4" />
                                        Return Home
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                                <div className="max-w-6xl mx-auto flex gap-8">
                                {/* Desktop Sidebar */}
                                <aside className="hidden lg:block w-48 flex-shrink-0">
                                    <div className="sticky top-24">
                                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                                            Jump to Month
                                        </h3>
                                        <nav className="space-y-4">
                                            {/* Group by year */}
                                            {Object.entries(
                                                eventGroups.reduce((acc, group) => {
                                                    if (!acc[group.year]) acc[group.year] = [];
                                                    acc[group.year].push(group);
                                                    return acc;
                                                }, {})
                                            ).map(([year, groups]) => (
                                                <div key={year}>
                                                    <h4 className="text-xs font-semibold text-muted-foreground mb-2 pl-3">{year}</h4>
                                                    <div className="space-y-1">
                                                        {groups.map((group) => (
                                                            <button
                                                                key={group.key}
                                                                onClick={() => scrollToSection(group.key)}
                                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${
                                                                    activeMonth === group.key
                                                                        ? 'bg-primary text-white shadow-md'
                                                                        : group.isPast
                                                                            ? 'text-muted-foreground hover:bg-muted/50'
                                                                            : 'text-foreground hover:bg-secondary'
                                                                }`}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`w-2 h-2 rounded-full ${
                                                                        activeMonth === group.key
                                                                            ? 'bg-white'
                                                                            : group.isPast
                                                                                ? 'bg-muted-foreground/30'
                                                                                : 'bg-primary'
                                                                    }`} />
                                                                    <span className="font-medium text-sm">{group.shortLabel}</span>
                                                                </div>
                                                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                                                    activeMonth === group.key
                                                                        ? 'bg-white/20 text-white'
                                                                        : 'bg-muted text-muted-foreground'
                                                                }`}>
                                                                    {group.events.length}
                                                                </span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </nav>
                                    </div>
                                </aside>

                                {/* Timeline Content */}
                                <div className="flex-grow max-w-3xl">
                                    {/* Timeline Container */}
                                    <div className="relative">
                                        {/* Vertical Timeline Line */}
                                        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-muted" />

                                        {/* Event Groups by Month */}
                                        <div className="space-y-10">
                                            {eventGroups.map((group, groupIndex) => (
                                                <div 
                                                    key={group.key}
                                                    ref={(el) => sectionRefs.current[group.key] = el}
                                                    id={`month-${group.key}`}
                                                >
                                                    {/* Month Header */}
                                                    <div className="relative pl-16 md:pl-20 mb-6">
                                                        {/* Month marker on timeline */}
                                                        <div className={`absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-sm rotate-45 ${
                                                            group.isPast ? 'bg-muted-foreground/30' : 'bg-primary/60'
                                                        }`} />
                                                        <h3 className={`text-sm font-bold tracking-widest uppercase ${
                                                            group.isPast ? 'text-muted-foreground' : 'text-foreground'
                                                        }`}>
                                                            {group.label}
                                                            {group.isPast && (
                                                                <span className="ml-2 text-xs font-normal text-muted-foreground">(Past)</span>
                                                            )}
                                                        </h3>
                                                    </div>

                                                    {/* Events in this month */}
                                                    <div className="space-y-6">
                                                        {group.events.map((event, index) => {
                                                            const dateObj = formatDate(event.date);
                                                            const time = formatTime(event.date);
                                                            const isPast = isPastEvent(event.date);
                                                            const isNextEvent = event.id === nextEventId;
                                                            const eventIsToday = isToday(event.date);

                                                            return (
                                                                <article 
                                                                    key={event.id}
                                                                    className="relative pl-16 md:pl-20 animate-in fade-in slide-in-from-left-4"
                                                                    style={{ 
                                                                        animationDelay: `${(groupIndex * 3 + index) * 80}ms`,
                                                                        animationFillMode: 'backwards'
                                                                    }}
                                                                >
                                                                    {/* Timeline Node */}
                                                                    <div className={`absolute left-3.5 md:left-5.5 top-1 w-5 h-5 rounded-full border-4 transition-all ${
                                                                        isPast 
                                                                            ? 'bg-muted border-muted-foreground/20' 
                                                                            : isNextEvent
                                                                                ? 'bg-primary border-white shadow-lg shadow-primary/50 animate-pulse'
                                                                                : 'bg-primary border-white shadow-lg shadow-primary/30'
                                                                    }`} />

                                                                    {/* Date Badge */}
                                                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-3 ${
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
                                                                    <div className={`p-5 rounded-xl border transition-all duration-300 ${
                                                                        isPast 
                                                                            ? 'bg-muted/30 border-border/30' 
                                                                            : isNextEvent
                                                                                ? 'bg-white border-l-4 border-l-primary border-t border-r border-b border-border/50 shadow-xl'
                                                                                : 'bg-white border-l-4 border-l-primary/30 border-t border-r border-b border-border/50 hover:border-primary/30 hover:shadow-lg'
                                                                    }`}>
                                                                        <h2 className={`text-xl font-bold font-serif mb-2 ${
                                                                            isPast ? 'text-muted-foreground' : 'text-foreground'
                                                                        }`}>
                                                                            {event.title}
                                                                        </h2>

                                                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground mb-3">
                                                                            {time && (
                                                                                <div className="flex items-center gap-1.5">
                                                                                    <Clock className="w-4 h-4" />
                                                                                    <span>{time}</span>
                                                                                </div>
                                                                            )}
                                                                            {event.location && (
                                                                                <div className="flex items-center gap-1.5">
                                                                                    <MapPin className="w-4 h-4" />
                                                                                    <span>{event.location}</span>
                                                                                </div>
                                                                            )}
                                                                            {event.event_type && !isPast && (
                                                                                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                                                                                    {eventTypeLabels[event.event_type] || event.event_type}
                                                                                </span>
                                                                            )}
                                                                            {event.ministry_name && (
                                                                                <span className="text-muted-foreground">• {event.ministry_name}</span>
                                                                            )}
                                                                        </div>

                                                                        {event.description && (
                                                                            <p className={`text-sm leading-relaxed ${
                                                                                isPast ? 'text-muted-foreground/70' : 'text-muted-foreground'
                                                                            }`}>
                                                                                {event.description}
                                                                            </p>
                                                                        )}

                                                                        {/* Status badges for upcoming events */}
                                                                        {!isPast && (event.is_full || (event.available_slots !== null && event.available_slots <= 10)) && (
                                                                            <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-2">
                                                                                {event.is_full && (
                                                                                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">Event Full</span>
                                                                                )}
                                                                                {!event.is_full && event.available_slots !== null && event.available_slots <= 10 && (
                                                                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                                                                                        {event.available_slots} spots left
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </article>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Timeline End Marker */}
                                        <div className="absolute left-4.5 md:left-6.5 bottom-0 w-3 h-3 rounded-full bg-muted border-2 border-background" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
