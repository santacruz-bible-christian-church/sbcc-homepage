import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
    return (
        <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center text-center text-white overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/hero-banner.jpg"
                    alt="Church Worship Background"
                    className="w-full h-full object-cover scale-105 animate-in fade-in duration-1000"
                    loading="eager"
                />
                {/* Refined Gradient Overlay - using brand colors for a richer feel */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-900/40 to-neutral-950/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 pt-10 flex flex-col items-center max-w-5xl">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: "100ms" }}>
                    <span className="inline-flex items-center py-1.5 px-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold mb-8 tracking-[0.2em] uppercase text-white/90 shadow-lg">
                        Welcome Home
                    </span>
                </div>

                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 drop-shadow-2xl tracking-tight" style={{ animationDelay: "300ms" }}>
                    <span className="block text-3xl md:text-4xl lg:text-5xl font-light mb-2 text-white/90 font-sans tracking-normal">Welcome to</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/80">
                        Santa Cruz Bible Christian Church
                    </span>
                </h1>

                <p className="text-lg md:text-2xl mb-12 text-white/80 max-w-3xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 drop-shadow-md" style={{ animationDelay: "600ms" }}>
                    Growing in Faith, Serving the Community. <br className="hidden md:block" />
                    Join us for worship, prayer, and fellowship.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ animationDelay: "800ms" }}>
                    <Button asChild size="lg" className="text-lg px-10 py-7 rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 bg-primary hover:bg-primary/90 border-none w-full sm:w-auto">
                        <a href="#prayer">Submit Prayer Request</a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="text-lg px-10 py-7 rounded-full bg-white/5 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-primary hover:border-white hover:-translate-y-1 transition-all duration-300 group w-full sm:w-auto">
                        <a href="#announcements" className="flex items-center justify-center gap-3">
                            View Announcements
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce duration-2000 text-white/50">
                <ChevronDown className="w-8 h-8" />
            </div>
        </section>
    );
}
