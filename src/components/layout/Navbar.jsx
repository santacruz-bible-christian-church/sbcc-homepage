import { useState, useEffect } from "react";
import { Menu, X, LogIn, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";
import { useSettings } from "@/contexts/SettingsContext";
import { NAV_LINKS, EXTERNAL_LINKS } from "@/constants";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
    const { settings, error: settingsError } = useSettings();
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    const location = useLocation();

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100) {
                setIsVisible(currentScrollY < lastScrollY);
            } else {
                setIsVisible(true);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out font-sans",
                isVisible ? "translate-y-0" : "-translate-y-full"
            )}
        >
            {/* System Status Bar (Brutalist aesthetic) */}
            {settingsError && (
                <div className="bg-red-600 text-white font-mono text-[10px] uppercase tracking-widest text-center py-1 border-b border-black">
                    System Alert: Offline Mode Active
                </div>
            )}

            {/* Main Navbar Container - Glass & Texture */}
            <div className="w-full bg-background/80 backdrop-blur-md border-b border-black/10 shadow-sm relative overflow-hidden">
                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] mix-blend-overlay" />

                <div className="container mx-auto px-6 h-16 flex items-center justify-between relative z-10">
                    
                    {/* Logo - Ink Stamp Style */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div 
                            className="h-8 w-8 lg:h-9 lg:w-9 flex items-center justify-center overflow-hidden"
                        >
                            <img 
                                src="/sbcc-logo.png" 
                                alt="SBCC Seal" 
                                className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif text-lg lg:text-xl font-bold tracking-tighter text-foreground leading-none">
                                SBCC
                            </span>
                            <span className="font-mono text-[8px] lg:text-[10px] uppercase tracking-[0.2em] text-muted-foreground leading-none">
                                Est. 1992
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav - Brackets Reveal */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="relative group p-2"
                            >
                                <span className={cn(
                                    "font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-300",
                                    location.pathname === link.href ? "text-primary font-bold" : "text-foreground/70 group-hover:text-foreground"
                                )}>
                                    <span className="opacity-0 -translate-x-2 inline-block transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary mr-1">[</span>
                                    {link.name}
                                    <span className="opacity-0 translate-x-2 inline-block transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary ml-1">]</span>
                                </span>
                                {location.pathname === link.href && (
                                    <motion.div 
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Portal Link - Tactile Button */}
                        <a 
                            href={EXTERNAL_LINKS.MANAGEMENT_SYSTEM} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hidden lg:flex items-center gap-2 px-6 py-2 bg-neutral-100 hover:bg-black hover:text-white border border-black/20 text-xs font-mono uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
                        >
                            <LogIn className="h-3 w-3" />
                            <span>Portal</span>
                        </a>

                        {/* Mobile Nav Toggle */}
                        <div className="lg:hidden">
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="hover:bg-muted/50 rounded-none border border-transparent hover:border-black/10 text-foreground">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent 
                                    side="right" 
                                    className="w-[85vw] sm:w-[400px] border-l-[3px] border-black bg-[#f4f1ea] p-0 overflow-hidden"
                                    hideDefaultClose={true}
                                >
                                    <VisuallyHidden.Root>
                                        <SheetTitle>Navigation Menu</SheetTitle>
                                    </VisuallyHidden.Root>
                                    <div className="h-full flex flex-col relative z-10">
                                        <div className="p-6 border-b-2 border-dashed border-black/20 flex items-center justify-between">
                                            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Index_v2.0</span>
                                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-black hover:text-white transition-colors">
                                                <X className="h-5 w-5" />
                                            </Button>
                                        </div>

                                        <nav className="flex flex-col p-6 gap-3 overflow-y-auto">
                                            {NAV_LINKS.map((link, index) => (
                                                <Link
                                                    key={link.name}
                                                    to={link.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="group relative block p-4 bg-white border border-black/10 shadow-sm hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-serif text-xl sm:text-2xl font-bold italic text-foreground group-hover:text-primary transition-colors">
                                                            {link.name}
                                                        </span>
                                                        <ArrowRight className="h-4 w-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                                    </div>
                                                    <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </Link>
                                            ))}
                                        </nav>

                                        <div className="mt-auto p-6 bg-neutral-100 border-t-2 border-black">
                                            <a 
                                                href={EXTERNAL_LINKS.MANAGEMENT_SYSTEM} 
                                                className="flex items-center justify-center gap-3 w-full py-4 bg-black text-white font-mono text-sm uppercase tracking-widest hover:bg-primary transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                                            >
                                                <LogIn className="w-4 h-4" />
                                                Access Portal
                                            </a>
                                            <div className="mt-6 text-center font-mono text-[10px] text-muted-foreground">
                                                SBCC Digital Ministry<br/>
                                                &copy; {new Date().getFullYear()}
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>

                {/* Reading Progress Bar */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary origin-left z-20"
                    style={{ scaleX }}
                />
            </div>
        </header>
    );
}
