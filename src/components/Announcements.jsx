import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, MapPin, Loader2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
                const data = await api.getAnnouncements();
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
        const date = new Date(dateString);
        // Fallback if date parsing fails or if it's just a string like "Oct 15, 2023"
        // We'll try to parse the string manually if it's in a standard format, otherwise just return placeholders

        // Simple parsing for "Month Day, Year" format commonly used in mock data
        const parts = dateString.split(' ');
        if (parts.length >= 2) {
            return {
                month: parts[0].substring(0, 3).toUpperCase(),
                day: parts[1].replace(',', '')
            };
        }

        return { month: 'NOV', day: '01' }; // Fallback
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
                ) : (
                    <div className="max-w-4xl mx-auto space-y-8">
                        {announcements.map((item) => {
                            const dateObj = formatDate(item.date);

                            return (
                                <div key={item.id} className="group flex flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-8 rounded-2xl border border-neutral-100 bg-white hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                                    {/* Date Box */}
                                    <div className="flex-shrink-0 flex md:flex-col items-center justify-center md:justify-start gap-3 md:gap-1">
                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/5 rounded-2xl flex flex-col items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <span className="text-xs md:text-sm font-bold tracking-wider uppercase">{dateObj.month}</span>
                                            <span className="text-2xl md:text-3xl font-bold leading-none">{dateObj.day}</span>
                                        </div>
                                        <div className="md:hidden flex flex-col">
                                            <span className="text-sm text-muted-foreground font-medium">{item.date}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <Badge variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                {item.category}
                                            </Badge>
                                            {item.location && (
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <MapPin className="w-3.5 h-3.5 mr-1" />
                                                    {item.location}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-bold font-serif text-foreground mb-3 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                                            {item.description}
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
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <Badge>{item.category}</Badge>
                                                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                                                            <Calendar className="w-3.5 h-3.5" /> {item.date}
                                                        </span>
                                                    </div>
                                                    <DialogTitle className="text-3xl font-serif font-bold mb-2">{item.title}</DialogTitle>
                                                </DialogHeader>

                                                <div className="space-y-6 py-4">
                                                    {item.location && (
                                                        <div className="flex items-center gap-2 text-muted-foreground bg-secondary/30 p-3 rounded-lg">
                                                            <MapPin className="w-5 h-5 text-primary" />
                                                            <span className="font-medium">Location: {item.location}</span>
                                                        </div>
                                                    )}

                                                    <DialogDescription className="text-lg text-foreground leading-relaxed whitespace-pre-line">
                                                        {item.description}
                                                    </DialogDescription>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="mt-16 text-center">
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-2 hover:bg-secondary/50">
                        View All Events
                    </Button>
                </div>
            </div>
        </section>
    );
}
