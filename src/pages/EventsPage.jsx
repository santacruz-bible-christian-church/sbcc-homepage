import { useState, useEffect, useRef } from "react";
import { MapPin, Clock, Loader2, CalendarDays, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    useEvents,
    useScrollToTop,
    formatDateBoxExtended,
    formatTime,
} from "@/hooks";

// Event type labels
const EVENT_TYPE_LABELS = {
    service: 'Sunday Service',
    bible_study: 'Bible Study',
    prayer_meeting: 'Prayer Meeting',
    fellowship: 'Fellowship',
    outreach: 'Outreach',
    other: 'Event'
};

export default function EventsPage() {
    useScrollToTop();
    
    const {
        events,
        loading,
        upcomingEvents,
        pastEvents,
        nextEvent,
        groupEventsByMonth,
        isPastEvent,
    } = useEvents({ limit: 50, timeFilter: 'all' });

    const [activeMonth, setActiveMonth] = useState(null);
    const sectionRefs = useRef({});

    // Exclude the next event from timeline (it's featured separately)
    const timelineEvents = nextEvent ? events.filter(e => e.id !== nextEvent.id) : events;
    const eventGroups = groupEventsByMonth(timelineEvents);

    // Set initial active month
    useEffect(() => {
        if (eventGroups.length > 0 && !activeMonth) {
            const upcomingMonth = eventGroups.find(g => !g.isPast);
            setActiveMonth(upcomingMonth?.key || eventGroups[0].key);
        }
    }, [eventGroups, activeMonth]);

    // Scroll spy
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

    const scrollToSection = (key) => {
        setActiveMonth(key);
        const element = sectionRefs.current[key];
        if (element) {
            const offset = 150;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/worship-service.jpg"
                        alt="Worship Service"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-900/40 to-neutral-950/60" />
                </div>

                <div className="relative z-10 container mx-auto px-6 py-24">
                    <div className="max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-lg shadow-white/10">
                            <CalendarDays className="w-10 h-10 text-white drop-shadow-lg" />
                        </div>

                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="w-12 h-[2px] bg-white/50" />
                            <span className="text-white/80 font-medium tracking-widest text-sm uppercase">
                                Join Us
                            </span>
                            <div className="w-12 h-[2px] bg-white/50" />
                        </div>

                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            Events
                        </h1>

                        <p className="text-lg text-white/70 mb-8 max-w-lg mx-auto">
                            Join us for worship, fellowship, and community activities.
                        </p>

                        {/* Stats */}
                        {!loading && events.length > 0 && (
                            <div className="flex justify-center gap-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white">{upcomingEvents.length}</div>
                                    <div className="text-sm text-white/60">Upcoming</div>
                                </div>
                                <div className="w-px bg-white/20" />
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white/60">{pastEvents.length}</div>
                                    <div className="text-sm text-white/60">Completed</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="max-w-5xl mx-auto">
                            {/* Featured Skeleton */}
                            <div className="mb-16">
                                <div className="h-4 w-24 bg-muted rounded mb-6 animate-pulse" />
                                <div className="bg-white border-l-4 border-l-primary border border-border/50 rounded-2xl p-8 animate-pulse">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="w-20 h-20 bg-muted rounded-2xl flex-shrink-0" />
                                        <div className="flex-grow">
                                            <div className="h-4 w-32 bg-muted rounded mb-3" />
                                            <div className="h-8 w-3/4 bg-muted rounded mb-4" />
                                            <div className="flex gap-4 mb-4">
                                                <div className="h-4 w-20 bg-muted rounded" />
                                                <div className="h-4 w-28 bg-muted rounded" />
                                            </div>
                                            <div className="h-4 w-full bg-muted rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Skeleton */}
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white border border-border/50 rounded-xl p-5 animate-pulse">
                                        <div className="flex gap-4">
                                            <div className="w-14 h-14 bg-muted rounded-xl flex-shrink-0" />
                                            <div className="flex-grow">
                                                <div className="h-5 w-2/3 bg-muted rounded mb-2" />
                                                <div className="h-3 w-1/3 bg-muted rounded" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-20 max-w-md mx-auto">
                            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                                <CalendarDays className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-3">No Events</h3>
                            <p className="text-muted-foreground">
                                There are no events at this time. Check back soon!
                            </p>
                        </div>
                    ) : (
                        <div className="max-w-5xl mx-auto">
                            {/* Featured Next Event */}
                            {nextEvent && (
                                <div className="mb-16">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                        <span className="text-sm font-bold text-primary uppercase tracking-wider">Next Up</span>
                                    </div>
                                    
                                    <article className="group bg-white border-l-4 border-l-primary border border-border/50 rounded-2xl p-8 md:p-10 shadow-xl">
                                        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                                            <div className="flex-shrink-0">
                                                <div className="w-20 h-20 bg-primary rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-primary/30">
                                                    <span className="text-xs font-bold tracking-wider uppercase">{formatDateBoxExtended(nextEvent.date).month}</span>
                                                    <span className="text-3xl font-bold leading-none">{formatDateBoxExtended(nextEvent.date).day}</span>
                                                </div>
                                            </div>

                                            <div className="flex-grow">
                                                <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-muted-foreground">
                                                    <span className="text-primary font-medium">{formatDateBoxExtended(nextEvent.date).full}</span>
                                                    {nextEvent.event_type && (
                                                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                                                            {EVENT_TYPE_LABELS[nextEvent.event_type] || nextEvent.event_type}
                                                        </span>
                                                    )}
                                                </div>

                                                <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground mb-4">
                                                    {nextEvent.title}
                                                </h2>

                                                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                                                    {formatTime(nextEvent.date) && (
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{formatTime(nextEvent.date)}</span>
                                                        </div>
                                                    )}
                                                    {nextEvent.location && (
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="w-4 h-4" />
                                                            <span>{nextEvent.location}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {nextEvent.description && (
                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {nextEvent.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            )}

                            {/* Timeline with Sidebar */}
                            {eventGroups.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full" />
                                        <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">All Events</span>
                                    </div>

                                    {/* Mobile Month Tabs */}
                                    <div className="lg:hidden sticky top-16 z-20 bg-background/95 backdrop-blur-sm -mx-6 px-6 py-3 mb-8 border-b border-border/30">
                                        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                                            {eventGroups.map((group) => (
                                                <button
                                                    key={group.key}
                                                    onClick={() => scrollToSection(group.key)}
                                                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                                        activeMonth === group.key
                                                            ? 'bg-primary text-white'
                                                            : group.isPast
                                                                ? 'bg-muted/50 text-muted-foreground'
                                                                : 'bg-secondary text-foreground'
                                                    }`}
                                                >
                                                    {group.shortLabel}
                                                    <span className="ml-1.5 text-xs opacity-70">{group.events.length}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-8">
                                        {/* Desktop Sidebar */}
                                        <aside className="hidden lg:block w-48 flex-shrink-0">
                                            <div className="sticky top-24">
                                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                                                    Jump to Month
                                                </h3>
                                                <nav className="space-y-1">
                                                    {eventGroups.map((group) => (
                                                        <button
                                                            key={group.key}
                                                            onClick={() => scrollToSection(group.key)}
                                                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${
                                                                activeMonth === group.key
                                                                    ? 'bg-primary text-white'
                                                                    : group.isPast
                                                                        ? 'text-muted-foreground hover:bg-muted/50'
                                                                        : 'text-foreground hover:bg-secondary'
                                                            }`}
                                                        >
                                                            <span className="font-medium text-sm">{group.shortLabel}</span>
                                                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                                                activeMonth === group.key
                                                                    ? 'bg-white/20'
                                                                    : 'bg-muted'
                                                            }`}>
                                                                {group.events.length}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </nav>
                                            </div>
                                        </aside>

                                        {/* Events List */}
                                        <div className="flex-grow space-y-12">
                                            {eventGroups.map((group) => (
                                                <div 
                                                    key={group.key}
                                                    ref={(el) => sectionRefs.current[group.key] = el}
                                                >
                                                    <h3 className={`text-lg font-bold mb-6 ${group.isPast ? 'text-muted-foreground' : 'text-foreground'}`}>
                                                        {group.label}
                                                        {group.isPast && <span className="ml-2 text-sm font-normal text-muted-foreground">(Past)</span>}
                                                    </h3>

                                                    <div className="space-y-4">
                                                        {group.events.map((event) => {
                                                            const dateObj = formatDateBoxExtended(event.date);
                                                            const time = formatTime(event.date);
                                                            const isPast = isPastEvent(event.date);

                                                            return (
                                                                <article 
                                                                    key={event.id}
                                                                    className={`group flex gap-4 p-5 rounded-xl border transition-all ${
                                                                        isPast 
                                                                            ? 'bg-muted/30 border-border/30' 
                                                                            : 'bg-white border-border/50 hover:shadow-lg hover:border-primary/20'
                                                                    }`}
                                                                >
                                                                    <div className="flex-shrink-0">
                                                                        <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center ${
                                                                            isPast 
                                                                                ? 'bg-muted text-muted-foreground' 
                                                                                : 'bg-secondary text-foreground group-hover:bg-primary group-hover:text-white'
                                                                        } transition-colors`}>
                                                                            <span className="text-[10px] font-bold tracking-wider uppercase">{dateObj.month}</span>
                                                                            <span className="text-xl font-bold leading-none">{dateObj.day}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex-grow min-w-0">
                                                                        <h4 className={`text-lg font-bold font-serif mb-1.5 ${
                                                                            isPast ? 'text-muted-foreground' : 'text-foreground group-hover:text-primary'
                                                                        } transition-colors`}>
                                                                            {event.title}
                                                                        </h4>

                                                                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                                                            {time && (
                                                                                <div className="flex items-center gap-1">
                                                                                    <Clock className="w-3.5 h-3.5" />
                                                                                    <span>{time}</span>
                                                                                </div>
                                                                            )}
                                                                            {event.location && (
                                                                                <div className="flex items-center gap-1">
                                                                                    <MapPin className="w-3.5 h-3.5" />
                                                                                    <span>{event.location}</span>
                                                                                </div>
                                                                            )}
                                                                            {isPast && (
                                                                                <span className="flex items-center gap-1 text-muted-foreground/60">
                                                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                                                    Completed
                                                                                </span>
                                                                            )}
                                                                        </div>

                                                                        {event.description && !isPast && (
                                                                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                                                                {event.description}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </article>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
