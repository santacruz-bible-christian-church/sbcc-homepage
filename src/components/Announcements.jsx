import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/services/api";

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                // Fetch only 3 announcements for homepage preview
                const data = await api.getAnnouncements({ limit: 3 });
                setAnnouncements(data);
            } catch (error) {
                console.error("Failed to fetch announcements:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // Helper to format date for the date box (uses publish_at from backend)
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

    return (
        <section id="announcements" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h4 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">News & Updates</h4>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Latest Announcements</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        Stay connected with our church family. Here's what's happening coming up.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    </div>
                ) : announcements.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">No announcements at this time. Check back soon!</p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-6">
                        {announcements.map((item) => {
                            // Use publish_at for date display
                            const dateObj = formatDate(item.publish_at);

                            return (
                                <div key={item.id} className="group flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 rounded-2xl border border-neutral-100 bg-white hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                                    {/* Date Box */}
                                    <div className="flex-shrink-0 flex md:flex-col items-center justify-center md:justify-start gap-3 md:gap-1">
                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/5 rounded-2xl flex flex-col items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <span className="text-xs md:text-sm font-bold tracking-wider uppercase">{dateObj.month}</span>
                                            <span className="text-2xl md:text-3xl font-bold leading-none">{dateObj.day}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <h3 className="text-xl md:text-2xl font-bold font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                {formatFullDate(item.publish_at)}
                                            </div>
                                            {item.ministry_name && (
                                                <span className="text-primary/80 font-medium">
                                                    {item.ministry_name}
                                                </span>
                                            )}
                                        </div>

                                        {/* Use body field from backend */}
                                        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                                            {item.body}
                                        </p>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="link" className="p-0 h-auto text-primary font-semibold group/btn">
                                                    Read Full Details
                                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[600px]">
                                                <DialogHeader>
                                                    <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatFullDate(item.publish_at)}
                                                        {item.ministry_name && (
                                                            <>
                                                                <span className="text-border">•</span>
                                                                <span className="text-primary/80 font-medium">{item.ministry_name}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <DialogTitle className="text-2xl md:text-3xl font-serif font-bold">{item.title}</DialogTitle>
                                                </DialogHeader>

                                                <DialogDescription className="text-base text-foreground leading-relaxed whitespace-pre-line pt-4">
                                                    {item.body}
                                                </DialogDescription>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="mt-16 text-center">
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                        <Link to="/announcements" className="flex items-center gap-2">
                            View All Announcements
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
