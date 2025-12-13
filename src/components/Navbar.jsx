import { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [scrolled, setScrolled] = useState(false);

    const navLinks = [
        { name: "About", href: "/#about" },
        { name: "Announcements", href: "/#announcements" },
        { name: "Prayer Request", href: "/#prayer" },
        { name: "Contact", href: "/#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Determine active section
            const sections = navLinks.map(link => link.href.substring(1));
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out",
                scrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm py-3 border-b border-white/20"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 h-12 flex items-center justify-between relative">
                {/* Logo */}
                <a href="/" className="flex items-center gap-3 group relative z-10">
                    <div className="relative overflow-hidden rounded-full">
                        <img
                            src="/assets/sbcc-logo.png"
                            alt="SBCC Logo"
                            className="h-10 w-auto transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                    <span className={cn(
                        "font-serif text-xl font-bold tracking-tight transition-colors duration-300",
                        scrolled ? "text-primary" : "text-white"
                    )}>
                        SBCC
                    </span>
                </a>

                {/* Desktop Nav - Centered */}
                <nav className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none">
                    <div className={cn(
                        "flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-500 pointer-events-auto",
                        scrolled ? "bg-secondary/50 backdrop-blur-sm" : "bg-black/10 backdrop-blur-sm border border-white/10"
                    )}>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                                    activeSection === link.href.substring(1)
                                        ? (scrolled ? "bg-white text-primary shadow-sm" : "bg-white/20 text-white backdrop-blur-md")
                                        : (scrolled ? "text-foreground/70 hover:text-foreground hover:bg-white/50" : "text-white/80 hover:text-white hover:bg-white/10")
                                )}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </nav>

                {/* Right Side: CTA & Mobile Toggle */}
                <div className="flex items-center gap-2 relative z-10">
                    {/* Desktop CTA - Icon Only */}
                    <Button
                        asChild
                        variant={scrolled ? "ghost" : "ghost"}
                        size="icon"
                        className={cn(
                            "hidden lg:flex rounded-full transition-all duration-300 hover:scale-105",
                            scrolled
                                ? "text-foreground hover:bg-secondary"
                                : "text-white hover:bg-white/20"
                        )}
                        title="Management System"
                    >
                        <a href="https://sbcc-frontend.pages.dev/" target="_blank" rel="noopener noreferrer">
                            <LayoutDashboard className="h-5 w-5" />
                            <span className="sr-only">Management System</span>
                        </a>
                    </Button>

                    {/* Mobile Nav Toggle */}
                    <div className="lg:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className={cn(
                                    "rounded-full transition-colors duration-300",
                                    scrolled ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/20"
                                )}>
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col border-l border-white/20 bg-white/95 backdrop-blur-xl">
                                <SheetTitle className="text-left font-serif text-2xl font-bold text-primary mb-8 flex items-center gap-2">
                                    <img src="/assets/sbcc-logo.png" alt="Logo" className="h-8 w-auto" />
                                    SBCC
                                </SheetTitle>
                                <nav className="flex flex-col gap-2 flex-1">
                                    {navLinks.map((link, index) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className={cn(
                                                "text-lg font-medium px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group",
                                                activeSection === link.href.substring(1)
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                            style={{ transitionDelay: `${index * 50}ms` }}
                                        >
                                            {link.name}
                                            <span className={cn(
                                                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                                activeSection === link.href.substring(1) ? "bg-primary" : "bg-transparent group-hover:bg-primary/30"
                                            )} />
                                        </a>
                                    ))}

                                    <div className="mt-auto mb-8">
                                        <Button asChild className="w-full rounded-full shadow-lg" size="lg">
                                            <a href="https://sbcc-frontend.pages.dev/" target="_blank" rel="noopener noreferrer">
                                                <LayoutDashboard className="mr-2 h-5 w-5" />
                                                Management System
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
