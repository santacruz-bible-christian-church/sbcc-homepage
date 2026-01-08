import { MapPin, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/contexts/SettingsContext";

export default function Footer() {
    const { settings } = useSettings();

    return (
        <footer className="bg-neutral-950 text-neutral-400 py-16 border-t border-neutral-900">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-1 space-y-4">
                        <a href="/" className="flex items-center gap-3 group">
                            <div className="relative overflow-hidden rounded-full bg-white/5 p-1">
                                <img src={settings.logo || "/assets/sbcc-logo.png"} alt={`${settings.app_name} Logo`} className="h-10 w-auto" />
                            </div>
                            <span className="font-serif text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">{settings.app_name}</span>
                        </a>
                        <p className="text-sm leading-relaxed text-neutral-500">
                            {settings.tagline}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#announcements" className="hover:text-primary transition-colors">Announcements</a></li>
                            <li><a href="#events" className="hover:text-primary transition-colors">Events</a></li>
                            <li><a href="#prayer" className="hover:text-primary transition-colors">Prayer Request</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 text-neutral-500 shrink-0" />
                                <span>{settings.address || '440 Frederick St, Santa Cruz, CA 95062'}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                                <span>{settings.phone || '(+63) 917-222-2222'}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                                <span>{settings.email || '1992.sbcc@gmail.com'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Service Times */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Worship With Us</h3>
                        <p className="text-sm text-neutral-400 mb-4">
                            {settings.service_schedule || 'Sunday Worship: 9:00 AM - 11:00 AM'}
                        </p>
                        <a
                            href="https://sbcc-app.pages.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                        >
                            Management System
                            <span className="text-xs">↗</span>
                        </a>
                    </div>
                </div>

                <Separator className="bg-neutral-900 mb-6" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
                    <p>&copy; {new Date().getFullYear()} {settings.church_name}. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
