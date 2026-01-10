import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

export default function Hero() {
    const { settings } = useSettings();

    return (
        <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/hero-worship.jpg"
                    alt="Worship Service"
                    className="w-full h-full object-cover scale-110"
                    loading="eager"
                />
                {/* Multi-layer gradient for depth - slightly stronger overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/75 to-neutral-950/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/40" />
                {/* Subtle noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }} />
            </div>

            {/* Main Content - Left Aligned with Navbar Spacing */}
            <div className="relative z-10 flex-1 flex items-center pt-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl">
                        {/* Accent Line + Label */}
                        <div className="flex items-center gap-4 mb-8 animate-in fade-in slide-in-from-left-4 duration-700">
                            <div className="w-12 h-[2px] bg-white/50" />
                            <span className="text-white font-semibold tracking-widest text-sm uppercase">
                                Welcome Home
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-white mb-6 animate-in fade-in slide-in-from-left-6 duration-700" style={{ animationDelay: "150ms" }}>
                            <span className="block font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-3">
                                {settings.church_name?.split(' ').slice(0, 2).join(' ')}
                            </span>
                            <span className="block font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-white/80">
                                {settings.church_name?.split(' ').slice(2).join(' ')}
                            </span>
                        </h1>

                        {/* Tagline */}
                        <p className="text-xl md:text-2xl text-white/60 mb-10 font-light leading-relaxed max-w-lg animate-in fade-in slide-in-from-left-6 duration-700" style={{ animationDelay: "300ms" }}>
                            {settings.tagline}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-left-6 duration-700" style={{ animationDelay: "450ms" }}>
                            <Button asChild size="lg" className="text-base px-8 py-6 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                                <a href="#featured">
                                    Explore Our Church
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-full border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-neutral-900 transition-all duration-300">
                                <a href="/about">
                                    Learn More
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
