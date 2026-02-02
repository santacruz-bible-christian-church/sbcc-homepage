import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, ArrowUp, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import { NAV_LINKS, ROUTES } from "@/constants";
import { useState, useEffect } from "react";

export default function Footer() {
    const { settings } = useSettings();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const socialLinks = [
        { icon: Facebook, href: settings.facebook_url || "#", label: "FB_LINK" },
        { icon: Instagram, href: settings.instagram_url || "#", label: "IG_LINK" },
        { icon: Youtube, href: settings.youtube_url || "#", label: "YT_LINK" },
    ];

    return (
        <footer className="bg-neutral-950 text-neutral-400 border-t-4 border-neutral-900 font-mono text-xs">
            {/* Top Grid: Massive Header */}
            <div className="border-b border-neutral-800 relative overflow-hidden">
                {/* Official Seal Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.03] pointer-events-none grayscale invert">
                    <img src="/sbcc-logo.png" alt="" className="w-full h-full object-contain" />
                </div>
                
                <div className="container mx-auto px-6 py-12 md:py-20 relative z-10">
                    <h1 className="text-[9vw] leading-none font-bold text-neutral-800 select-none tracking-tighter mix-blend-overlay">
                        PBCM-SBCC<span className="text-neutral-900">.ONLINE</span>
                    </h1>
                </div>
            </div>

            {/* Middle Grid: Data Columns */}
            <div className="container mx-auto border-x border-neutral-800">
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
                    
                    {/* Col 1: Mission Spec */}
                    <div className="p-8 hover:bg-neutral-900 transition-colors duration-300">
                        <span className="block mb-6 text-neutral-600">// OUR_MISSION</span>
                        <p className="uppercase leading-relaxed text-neutral-300">
                            "{settings.mission || "TO KNOW CHRIST AND MAKE HIM KNOWN THROUGH WORSHIP, DISCIPLESHIP, AND SERVICE."}"
                        </p>
                    </div>

                    {/* Col 2: Sitemap */}
                    <div className="p-8 hover:bg-neutral-900 transition-colors duration-300 flex flex-col justify-between">
                        <div>
                            <span className="block mb-6 text-neutral-600">// DISCOVER</span>
                            <nav className="flex flex-col gap-2">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="uppercase hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 text-green-500"></span>
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Col 3: System Status */}
                    <div className="p-8 hover:bg-neutral-900 transition-colors duration-300">
                        <span className="block mb-6 text-neutral-600">// LIVE_UPDATES</span>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-neutral-800 pb-2">
                                <span>CURRENT_TIME</span>
                                <span className="text-white">{time.toLocaleTimeString()}</span>
                            </div>
                            <div className="flex justify-between border-b border-neutral-800 pb-2">
                                <span>DATE</span>
                                <span className="text-white">{time.toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between border-b border-neutral-800 pb-2">
                                <span>CONNECTION</span>
                                <span className="text-green-500 font-bold flex items-center gap-2">
                                    <Activity className="w-3 h-3 animate-pulse" /> ONLINE
                                </span>
                            </div>
                            <div className="flex gap-4 mt-6">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-500 hover:text-white transition-colors"
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Col 4: Back to Top */}
                    <div className="p-0 hover:bg-neutral-900 transition-colors duration-300 relative group cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <ArrowUp className="w-8 h-8 text-neutral-600 group-hover:text-white group-hover:-translate-y-2 transition-all duration-300" />
                            <span className="uppercase tracking-widest text-neutral-600 group-hover:text-white">Back to Top</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Grid: Copyright */}
            <div className="border-t border-neutral-800">
                 <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-neutral-600 uppercase">
                    <p>© {new Date().getFullYear()} {settings.app_name} // TO GOD BE THE GLORY</p>
                    <p>EST. 1992 // SANTA CRUZ, PH</p>
                 </div>
            </div>
        </footer>
    );
}
