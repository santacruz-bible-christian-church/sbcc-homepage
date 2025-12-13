import { Send, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <footer className="bg-neutral-950 text-neutral-400 py-20 border-t border-neutral-900">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1 space-y-6">
                        <a href="/" className="flex items-center gap-3 group">
                            <div className="relative overflow-hidden rounded-full bg-white/5 p-1">
                                <img src="/assets/sbcc-logo.png" alt="SBCC Logo" className="h-10 w-auto" />
                            </div>
                            <span className="font-serif text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">SBCC</span>
                        </a>
                        <p className="text-sm leading-relaxed text-neutral-500">
                            Growing in Faith, Serving the Community. Join us in our journey to know Christ and make Him known.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group">
                                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group">
                                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group">
                                <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="sr-only">YouTube</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">Quick Links</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#about" className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">About Us</a></li>
                            <li><a href="#contact" className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">Contact</a></li>
                            <li><a href="#prayer" className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">Prayer Request</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">Resources</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#announcements" className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">Announcements</a></li>
                            <li><a href="#" className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">Sermons</a></li>
                            <li><a href="#" className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block">Events Calendar</a></li>
                            <li>
                                <a
                                    href="https://sbcc-frontend.pages.dev/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-2 mt-2"
                                >
                                    Management System
                                    <span className="text-xs">↗</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">Stay Connected</h3>
                        <p className="text-sm text-neutral-500 mb-6">Subscribe to our newsletter for weekly updates and inspiration.</p>
                        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="Your Email Address"
                                    className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-primary focus-visible:border-primary h-11 pl-4 pr-12 rounded-lg transition-all"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="absolute right-1 top-1 h-9 w-9 rounded-md bg-primary hover:bg-primary/90 text-white transition-colors"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-xs text-neutral-600">
                                By subscribing, you agree to our Privacy Policy.
                            </p>
                        </form>
                    </div>
                </div>

                <Separator className="bg-neutral-900 mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-600">
                    <p>&copy; {new Date().getFullYear()} Santa Cruz Bible Christian Church. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-neutral-400 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
