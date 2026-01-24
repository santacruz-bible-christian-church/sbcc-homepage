import { Calendar, Loader2, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    useAnnouncements,
    useScrollToTop,
    formatDateBox,
    formatFullDate,
    formatRelativeTime,
} from "@/hooks";

export default function AnnouncementsPage() {
    useScrollToTop();
    const { announcements, loading, featuredAnnouncement, restAnnouncements } = useAnnouncements({ limit: 20 });

    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center justify-center text-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/pastor-preaching.jpg"
                        alt="Pastor Preaching"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/30" />
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-6 py-24">
                    <div className="max-w-2xl mx-auto">
                        {/* Icon */}
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-lg shadow-white/10">
                            <Megaphone className="w-10 h-10 text-white drop-shadow-lg" />
                        </div>

                        {/* Accent */}
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="w-12 h-[2px] bg-white/50" />
                            <span className="text-white/80 font-medium tracking-widest text-sm uppercase">
                                Stay Updated
                            </span>
                            <div className="w-12 h-[2px] bg-white/50" />
                        </div>

                        {/* Title */}
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                            Announcements
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-white/70 max-w-lg mx-auto">
                            The latest news and happenings from our church community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="max-w-6xl mx-auto">
                            {/* Featured Skeleton */}
                            <div className="mb-12">
                                <div className="h-4 w-32 bg-muted rounded mb-6 animate-pulse" />
                                <div className="bg-white border border-border/50 rounded-2xl p-8 animate-pulse">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="w-20 h-20 bg-muted rounded-2xl flex-shrink-0" />
                                        <div className="flex-grow">
                                            <div className="h-4 w-24 bg-muted rounded mb-3" />
                                            <div className="h-8 w-3/4 bg-muted rounded mb-4" />
                                            <div className="h-4 w-full bg-muted rounded mb-2" />
                                            <div className="h-4 w-2/3 bg-muted rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Grid Skeleton */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="bg-white border border-border/50 rounded-xl p-6 animate-pulse">
                                        <div className="flex gap-4">
                                            <div className="w-14 h-14 bg-muted rounded-xl flex-shrink-0" />
                                            <div className="flex-grow">
                                                <div className="h-5 w-3/4 bg-muted rounded mb-2" />
                                                <div className="h-3 w-1/2 bg-muted rounded" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : announcements.length === 0 ? (
                        <div className="text-center py-20 max-w-md mx-auto">
                            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                                <Megaphone className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-3">No Announcements Yet</h3>
                            <p className="text-muted-foreground">
                                There are no announcements at this time. Check back soon!
                            </p>
                        </div>
                    ) : (
                        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
                            {/* Featured Announcement */}
                            {featuredAnnouncement && (
                                <div className="mb-16">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="w-2 h-2 bg-primary rounded-full" />
                                        <span className="text-sm font-bold text-primary uppercase tracking-wider">Latest</span>
                                    </div>
                                    
                                    <article className="group bg-white border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                                        {/* Photo */}
                                        {featuredAnnouncement.photo && (
                                            <div className="relative w-full h-64 md:h-80 overflow-hidden">
                                                <img
                                                    src={featuredAnnouncement.photo}
                                                    alt={featuredAnnouncement.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                            </div>
                                        )}

                                        <div className="p-8 md:p-10">
                                            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                                                {/* Date Box */}
                                                <div className="flex-shrink-0">
                                                    <div className="w-20 h-20 bg-primary rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-primary/30">
                                                        <span className="text-xs font-bold tracking-wider uppercase">{formatDateBox(featuredAnnouncement.publish_at).month}</span>
                                                        <span className="text-3xl font-bold leading-none">{formatDateBox(featuredAnnouncement.publish_at).day}</span>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-grow">
                                                    <div className="flex flex-wrap items-center gap-2 mb-3 text-sm text-muted-foreground">
                                                        {formatRelativeTime(featuredAnnouncement.publish_at) && (
                                                            <span className="font-medium text-primary">{formatRelativeTime(featuredAnnouncement.publish_at)}</span>
                                                        )}
                                                        {featuredAnnouncement.ministry_name && (
                                                            <>
                                                                <span className="text-border">•</span>
                                                                <span className="bg-secondary px-2 py-0.5 rounded-full text-xs font-medium">{featuredAnnouncement.ministry_name}</span>
                                                            </>
                                                        )}
                                                    </div>

                                                    <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground mb-4 group-hover:text-primary transition-colors">
                                                        {featuredAnnouncement.title}
                                                    </h2>

                                                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                                                        {featuredAnnouncement.body}
                                                    </p>

                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" className="rounded-full px-6">
                                                                Read Full Announcement →
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] max-h-[95vh] overflow-y-auto p-0">
                                                            {featuredAnnouncement.photo && (
                                                                <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
                                                                    <img
                                                                        src={featuredAnnouncement.photo}
                                                                        alt={featuredAnnouncement.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
                                                                </div>
                                                            )}
                                                            <DialogHeader className="px-6">
                                                                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                                                                    <Calendar className="w-4 h-4" />
                                                                    {formatFullDate(featuredAnnouncement.publish_at)}
                                                                    {featuredAnnouncement.ministry_name && (
                                                                        <>
                                                                            <span>•</span>
                                                                            <span className="text-primary/80 font-medium">{featuredAnnouncement.ministry_name}</span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                                <DialogTitle className="text-xl md:text-2xl font-serif font-bold">{featuredAnnouncement.title}</DialogTitle>
                                                            </DialogHeader>
                                                            <DialogDescription className="text-base text-foreground leading-relaxed whitespace-pre-line pt-2 px-6 pb-6">
                                                                {featuredAnnouncement.body}
                                                            </DialogDescription>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            )}

                            {/* Grid of Other Announcements */}
                            {restAnnouncements.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full" />
                                        <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Previous Announcements</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {restAnnouncements.map((item, index) => {
                                            const dateObj = formatDateBox(item.publish_at);
                                            const relativeTime = formatRelativeTime(item.publish_at);

                                            return (
                                                <article 
                                                    key={item.id} 
                                                    className="group bg-white border border-border/50 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
                                                    style={{ 
                                                        animationDelay: `${index * 80}ms`,
                                                        animationFillMode: 'backwards'
                                                    }}
                                                >
                                                    {/* Photo Thumbnail */}
                                                    {item.photo && (
                                                        <div className="relative w-full h-40 overflow-hidden">
                                                            <img
                                                                src={item.photo}
                                                                alt={item.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="p-6">
                                                        <div className="flex gap-4">
                                                            {/* Date Box */}
                                                            <div className="flex-shrink-0">
                                                                <div className="w-14 h-14 bg-secondary rounded-xl flex flex-col items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                                                                    <span className="text-[10px] font-bold tracking-wider uppercase">{dateObj.month}</span>
                                                                    <span className="text-xl font-bold leading-none">{dateObj.day}</span>
                                                                </div>
                                                            </div>

                                                            {/* Content */}
                                                            <div className="flex-grow min-w-0">
                                                                <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs text-muted-foreground">
                                                                    {relativeTime && (
                                                                        <span className="font-medium">{relativeTime}</span>
                                                                    )}
                                                                    {item.ministry_name && (
                                                                        <>
                                                                            <span className="text-border">•</span>
                                                                            <span>{item.ministry_name}</span>
                                                                        </>
                                                                    )}
                                                                </div>

                                                                <h3 className="text-lg font-bold font-serif text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                                                    {item.title}
                                                                </h3>

                                                                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                                                    {item.body}
                                                                </p>

                                                                <Dialog>
                                                                    <DialogTrigger asChild>
                                                                        <Button variant="link" className="p-0 h-auto text-primary font-medium text-sm">
                                                                            Read more →
                                                                        </Button>
                                                                    </DialogTrigger>
                                                                    <DialogContent className="sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] max-h-[95vh] overflow-y-auto p-0">
                                                                        {item.photo && (
                                                                            <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
                                                                                <img
                                                                                    src={item.photo}
                                                                                    alt={item.title}
                                                                                    className="w-full h-full object-cover"
                                                                                />
                                                                                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
                                                                            </div>
                                                                        )}
                                                                        <DialogHeader className="px-6">
                                                                            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                                                                                <Calendar className="w-4 h-4" />
                                                                                {formatFullDate(item.publish_at)}
                                                                                {item.ministry_name && (
                                                                                    <>
                                                                                        <span>•</span>
                                                                                        <span className="text-primary/80 font-medium">{item.ministry_name}</span>
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                            <DialogTitle className="text-xl md:text-2xl font-serif font-bold">{item.title}</DialogTitle>
                                                                        </DialogHeader>
                                                                        <DialogDescription className="text-base text-foreground leading-relaxed whitespace-pre-line pt-2 px-6 pb-6">
                                                                            {item.body}
                                                                        </DialogDescription>
                                                                    </DialogContent>
                                                                </Dialog>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                            );
                                        })}
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