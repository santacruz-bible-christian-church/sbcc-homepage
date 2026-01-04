import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Loader2, Home, Megaphone } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Footer from "@/components/Footer";
import { api } from "@/services/api";

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await api.getAnnouncements({ limit: 20 });
                setAnnouncements(data);
            } catch (error) {
                console.error("Failed to fetch announcements:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // Helper to format date for the date box
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return { month: '---', day: '--' };
            }
            return {
                month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
                day: date.getDate().toString()
            };
        } catch {
            return { month: '---', day: '--' };
        }
    };

    // Helper to format full date display
    const formatFullDate = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString;
            return date.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } catch {
            return dateString;
        }
    };

    // Helper to format relative time
    const formatRelativeTime = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return null;
            
            const now = new Date();
            const diffMs = now - date;
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            
            if (diffDays === 0) return 'Today';
            if (diffDays === 1) return 'Yesterday';
            if (diffDays < 7) return `${diffDays} days ago`;
            if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
            return null;
        } catch {
            return null;
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <main>
                {/* Clean Header */}
                <section className="py-12 md:py-16 bg-gradient-to-b from-secondary/50 to-white border-b border-border/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
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
                                        Announcements
                                    </h1>
                                </div>
                                
                                {/* Announcement Count Badge */}
                                {!loading && announcements.length > 0 && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="w-2 h-2 bg-primary rounded-full" />
                                        <span>
                                            {announcements.length} {announcements.length === 1 ? 'announcement' : 'announcements'}
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            <p className="text-muted-foreground text-lg max-w-xl pl-14 sm:pl-14">
                                Stay updated with the latest news and happenings at our church.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Announcements List */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                                <p className="text-muted-foreground text-sm">Loading announcements...</p>
                            </div>
                        ) : announcements.length === 0 ? (
                            <div className="text-center py-20 max-w-md mx-auto">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Megaphone className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-serif font-bold mb-3">No Announcements Yet</h3>
                                <p className="text-muted-foreground mb-8">
                                    There are no announcements at this time. Check back soon!
                                </p>
                                <Button asChild size="lg" className="rounded-full px-8">
                                    <Link to="/" className="flex items-center gap-2">
                                        <Home className="w-4 h-4" />
                                        Return Home
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="max-w-4xl mx-auto space-y-5">
                                {announcements.map((item, index) => {
                                    const dateObj = formatDate(item.publish_at);
                                    const relativeTime = formatRelativeTime(item.publish_at);

                                    return (
                                        <article 
                                            key={item.id} 
                                            className="group flex flex-col md:flex-row gap-5 md:gap-6 p-5 md:p-6 rounded-xl border border-border/50 bg-white hover:border-primary/20 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
                                            style={{ 
                                                animationDelay: `${index * 80}ms`,
                                                animationFillMode: 'backwards'
                                            }}
                                        >
                                            {/* Date Box */}
                                            <div className="flex-shrink-0">
                                                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/5 rounded-xl flex flex-col items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                    <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase">{dateObj.month}</span>
                                                    <span className="text-xl md:text-2xl font-bold leading-none">{dateObj.day}</span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-grow min-w-0">
                                                <h2 className="text-lg md:text-xl font-bold font-serif text-foreground mb-1.5 group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h2>

                                                <div className="flex flex-wrap items-center gap-2 mb-2.5 text-sm text-muted-foreground">
                                                    {relativeTime && (
                                                        <span className="font-medium text-foreground/70">{relativeTime}</span>
                                                    )}
                                                    <span className="text-border">·</span>
                                                    <span>{formatFullDate(item.publish_at)}</span>
                                                    {item.ministry_name && (
                                                        <>
                                                            <span className="text-border">·</span>
                                                            <span className="text-primary/80 font-medium">{item.ministry_name}</span>
                                                        </>
                                                    )}
                                                </div>

                                                <p className="text-muted-foreground leading-relaxed mb-3 line-clamp-2 text-sm md:text-base">
                                                    {item.body}
                                                </p>

                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="link" className="p-0 h-auto text-primary font-medium text-sm">
                                                            Read more →
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[550px]">
                                                        <DialogHeader>
                                                            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                                                                <Calendar className="w-4 h-4" />
                                                                {formatFullDate(item.publish_at)}
                                                                {item.ministry_name && (
                                                                    <>
                                                                        <span>·</span>
                                                                        <span className="text-primary/80 font-medium">{item.ministry_name}</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                            <DialogTitle className="text-xl md:text-2xl font-serif font-bold">{item.title}</DialogTitle>
                                                        </DialogHeader>

                                                        <DialogDescription className="text-base text-foreground leading-relaxed whitespace-pre-line pt-2">
                                                            {item.body}
                                                        </DialogDescription>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
