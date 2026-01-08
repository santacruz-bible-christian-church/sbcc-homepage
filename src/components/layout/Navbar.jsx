import { useState, useEffect } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useSettings } from "@/contexts/SettingsContext";
import { NAV_LINKS, EXTERNAL_LINKS, HERO_CONFIG } from "@/constants";

export default function Navbar() {
    const { settings } = useSettings();
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [atTop, setAtTop] = useState(true);

    useEffect(() => {
        const heroHeight = window.innerHeight * HERO_CONFIG.SCROLL_TRIGGER;
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // At top of page
            setAtTop(currentScrollY < 20);
            
            // Show navbar after scrolling past hero
            if (currentScrollY > heroHeight) {
                // Scrolling up - show navbar
                if (currentScrollY < lastScrollY) {
                    setVisible(true);
                }
                // Scrolling down - hide navbar
                else {
                    setVisible(false);
                }
            } else {
                // In hero area - always visible (transparent)
                setVisible(true);
            }
            
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300",
                // Visibility
                visible ? "translate-y-0" : "-translate-y-full",
                // Background state
                atTop
                    ? "bg-transparent py-5"
                    : "bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-border/50"
            )}
        >
            <div className="container mx-auto px-6 h-12 flex items-center justify-between relative">
                {/* Logo */}
                <a href="/" className="flex items-center gap-3 group relative z-10">
                    <div className="relative overflow-hidden rounded-full">
                        <img
                            src={settings.logo || "/assets/sbcc-logo.png"}
                            alt={`${settings.app_name} Logo`}
                            className="h-10 w-auto transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                    <span className={cn(
                        "font-serif text-xl font-bold tracking-tight transition-colors duration-300",
                        atTop ? "text-white" : "text-primary"
                    )}>
                        {settings.app_name}
                    </span>
                </a>

                {/* Desktop Nav - Centered */}
                <nav className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="flex items-center gap-8 pointer-events-auto">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
                                    atTop 
                                        ? "text-white/80 hover:text-white" 
                                        : "text-foreground/70 hover:text-primary"
                                )}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </nav>

                {/* Right Side: CTA & Mobile Toggle */}
                <div className="flex items-center gap-2 relative z-10">
                    {/* Desktop CTA */}
                    <a 
                        href={EXTERNAL_LINKS.MANAGEMENT_SYSTEM} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={cn(
                            "hidden lg:flex items-center gap-2 rounded-full transition-all duration-300 overflow-hidden group",
                            atTop
                                ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 px-3 py-2"
                                : "bg-secondary hover:bg-primary text-foreground hover:text-white px-3 py-2"
                        )}
                    >
                        <LogIn className="h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out group-hover:max-w-[200px] text-sm font-medium">
                            Login to System
                        </span>
                    </a>

                    {/* Mobile Nav Toggle */}
                    <div className="lg:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className={cn(
                                    "rounded-full transition-colors duration-300",
                                    atTop ? "text-white hover:bg-white/20" : "text-foreground hover:bg-secondary"
                                )}>
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col border-l border-border bg-white/95 backdrop-blur-xl">
                                <SheetTitle className="text-left font-serif text-2xl font-bold text-primary mb-8 flex items-center gap-2">
                                    <img src={settings.logo || "/assets/sbcc-logo.png"} alt="Logo" className="h-8 w-auto" />
                                    {settings.app_name}
                                </SheetTitle>
                                <nav className="flex flex-col gap-2 flex-1">
                                    {NAV_LINKS.map((link, index) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="text-lg font-medium px-4 py-3 rounded-xl transition-all duration-300 text-foreground/70 hover:bg-secondary hover:text-foreground"
                                            onClick={() => setIsOpen(false)}
                                            style={{ transitionDelay: `${index * 50}ms` }}
                                        >
                                            {link.name}
                                        </a>
                                    ))}

                                    <div className="mt-auto mb-8">
                                        <Button asChild className="w-full rounded-full shadow-lg" size="lg">
                                            <a href={EXTERNAL_LINKS.MANAGEMENT_SYSTEM} target="_blank" rel="noopener noreferrer">
                                                <LogIn className="mr-2 h-5 w-5" />
                                                Login to Management System
                                            </a>
                                        </Button>
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
