import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Eye, BookOpen, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSettings } from "@/contexts/SettingsContext";

export default function AboutPage() {
    const { settings } = useSettings();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const statementItems = settings.statement_of_faith
        ? settings.statement_of_faith.split('\n').filter(line => line.trim())
        : [
            "We believe in the Holy Scriptures as the inspired and authoritative Word of God.",
            "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.",
            "We believe in the deity of our Lord Jesus Christ, His virgin birth, His sinless life, His miracles, His vicarious and atoning death, His bodily resurrection, and His ascension.",
            "We believe in the spiritual unity of believers in our Lord Jesus Christ."
        ];

    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <Navbar />

            {/* Hero - Full Bleed */}
            <section className="relative min-h-[60vh] flex items-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/church-interior.jpg"
                        alt="Church Interior"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/30" />
                </div>

                <div className="container mx-auto px-6 relative z-10 pb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-[2px] bg-white/50" />
                        <span className="text-white/80 font-medium tracking-widest text-sm uppercase">
                            Who We Are
                        </span>
                    </div>

                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 max-w-3xl">
                        About Our Church
                    </h1>
                    <p className="text-xl text-white/70 max-w-xl">
                        {settings.tagline}
                    </p>
                </div>
            </section>

            {/* Our Story - Side by Side */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
                        {/* Image */}
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                                <img
                                    src="/assets/hero-worship.jpg"
                                    alt="Congregation"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl hidden md:block">
                                <div className="text-4xl font-bold">33+</div>
                                <div className="text-sm font-medium text-white/80">Years of Service</div>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-[2px] bg-primary" />
                                <span className="text-primary font-medium tracking-widest text-xs uppercase">Our Story</span>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                                A Community Built on Faith
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                {settings.history || "Founded in 1992, Santa Cruz Bible Christian Church has been a beacon of hope in our city for over three decades. We started as a small bible study group and have grown into a vibrant family of believers dedicated to living out the Gospel."}
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Our church is a place where everyone is welcome — whether you're exploring faith for the first time or have walked with Christ for years. We believe in the transformative power of authentic community and the unchanging truth of God's Word.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision - Quote Style */}
            <section className="py-20 md:py-28 bg-secondary/30">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-3 mb-4">
                                <div className="w-8 h-[2px] bg-primary" />
                                <span className="text-primary font-medium tracking-widest text-xs uppercase">Our Purpose</span>
                                <div className="w-8 h-[2px] bg-primary" />
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                                Mission & Vision
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Mission */}
                            <div className="relative bg-white dark:bg-neutral-900 rounded-2xl p-8 md:p-10 border-l-4 border-primary shadow-sm">
                                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary mb-4">
                                    <Target className="w-4 h-4" />
                                    Our Mission
                                </div>
                                <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
                                    {settings.mission || "To know Christ and make Him known through worship, discipleship, and service."}
                                </p>
                            </div>

                            {/* Vision */}
                            <div className="relative bg-white dark:bg-neutral-900 rounded-2xl p-8 md:p-10 border-l-4 border-amber-500 shadow-sm">
                                <Quote className="w-10 h-10 text-amber-500/20 mb-4" />
                                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-600 mb-4">
                                    <Eye className="w-4 h-4" />
                                    Our Vision
                                </div>
                                <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
                                    {settings.vision || "To see our city transformed by the love and power of the Gospel, one life at a time."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statement of Faith - Numbered */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-blue-600 font-medium tracking-widest text-xs uppercase block">What We Believe</span>
                                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Statement of Faith</h2>
                            </div>
                        </div>

                        <div className="space-y-6 mt-10">
                            {statementItems.map((item, index) => (
                                <div key={index} className="flex gap-6 items-start group">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                        {index + 1}
                                    </div>
                                    <p className="text-lg text-muted-foreground leading-relaxed pt-1.5">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/30 to-background">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-3 mb-4">
                                <div className="w-8 h-[2px] bg-primary" />
                                <span className="text-primary font-medium tracking-widest text-xs uppercase">Meet Our Team</span>
                                <div className="w-8 h-[2px] bg-primary" />
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                                Church Leadership
                            </h2>
                        </div>

                        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm border border-border/50 max-w-md mx-auto text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                                DB
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-1">Dennis Badillo</h3>
                            <p className="text-primary font-medium mb-2">Senior Pastor</p>
                            <p className="text-sm text-muted-foreground">
                                Serving our congregation with dedication and love since 2010.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
