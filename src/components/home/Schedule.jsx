import { Calendar } from "lucide-react";

export default function Schedule() {
    return (
        <section id="schedule" className="py-24 md:py-32 bg-background">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-[2px] bg-primary/50" />
                        <span className="text-sm font-bold uppercase tracking-wider text-primary">
                            Join Us
                        </span>
                        <div className="w-8 h-[2px] bg-primary/50" />
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Our Weekly Schedule
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Join us for worship, prayer, and fellowship throughout the week.
                    </p>
                </div>

                {/* Video Player */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-neutral-900">
                        <video
                            controls
                            playsInline
                            className="w-full aspect-video"
                        >
                            <source src="/assets/weekly-schedule.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    
                    {/* Caption */}
                    <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Watch our weekly schedule overview</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
