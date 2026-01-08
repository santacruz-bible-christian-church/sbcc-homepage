import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import { NAV_LINKS, ROUTES } from "@/constants";

export default function Footer() {
    const { settings } = useSettings();

    const socialLinks = [
        { icon: Facebook, href: settings.facebook_url || "#", label: "Facebook" },
        { icon: Instagram, href: settings.instagram_url || "#", label: "Instagram" },
        { icon: Youtube, href: settings.youtube_url || "#", label: "YouTube" },
    ];

    return (
        <footer className="bg-primary text-white">
            {/* CTA Section */}
            <div className="py-20 md:py-28 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                        Join Us This Sunday
                    </h2>
                    <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
                        Experience the warmth of our community. Everyone is welcome!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
                            <Link to={ROUTES.HOME}>Back to Home</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="rounded-full px-8 bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary hover:border-white">
                            <Link to={ROUTES.EVENTS}>View Events</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="py-12">
                <div className="container mx-auto px-6">
                    {/* Navigation */}
                    <nav className="flex flex-wrap justify-center gap-2 mb-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="px-5 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-3 mb-8">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:bg-white hover:text-primary transition-all duration-300"
                            >
                                <social.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-center text-sm text-white/50">
                        © {new Date().getFullYear()} {settings.church_name || "Santa Cruz Bible Christian Church"}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
