import { Calendar, Clock, MapPin, Play, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import { useWeeklyVerse } from "@/hooks";
import { motion } from "framer-motion";

export default function Schedule() {
    const { settings } = useSettings();
    const weeklyVerse = useWeeklyVerse();

    return (
        <section id="schedule" className="relative py-24 md:py-32 bg-neutral-900 border-t border-b border-white/10 overflow-hidden">
            {/* Custom Animations */}
            <style>{`
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-scanline {
                    animation: scanline 2s linear infinite;
                }
                .animate-marquee {
                    animation: marquee 15s linear infinite;
                }
            `}</style>

            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] mix-blend-overlay pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
                {/* Header - Stenciled Look */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="font-mono text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 block text-shadow-glow">
                        // System Broadcast
                    </span>
                    <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                        Weekly Transmission
                    </h2>
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="h-1 bg-primary mx-auto" 
                    />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start perspective-[2000px]">
                    
                    {/* LEFT NOTE: Sunday Service (Pinned Paper with Stamp) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50, rotate: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                        className="lg:col-span-3 lg:mt-12 order-2 lg:order-1 group perspective-[1000px]"
                    >
                        <div className="relative bg-[#f0f0f0] text-neutral-900 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] lg:rotate-[-2deg] transition-all duration-300 transform-style-3d group-hover:rotate-x-12 group-hover:rotate-y-12 group-hover:shadow-[20px_20px_20px_0px_rgba(0,0,0,0.3)]">
                             {/* Pin */}
                             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-sm border border-black/20 z-10" />
                            
                            {/* Ink Stamp */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 2 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8, duration: 0.3 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-[4px] border-double border-red-700/20 rounded-full flex items-center justify-center -rotate-12 pointer-events-none mix-blend-multiply z-0"
                            >
                                <span className="text-red-700/20 font-mono text-xs font-bold uppercase tracking-widest text-center">
                                    Official<br/>Schedule<br/>Verified
                                </span>
                            </motion.div>

                            <div className="relative z-10">
                                <h3 className="font-serif text-xl font-bold mb-4 border-b-2 border-dashed border-neutral-300 pb-2">
                                    Sunday Service
                                </h3>
                                <div className="space-y-3 font-mono text-sm">
                                    {/* Parse multiple services if separated by newlines or commas */}
                                    {(settings.service_schedule?.split(/[\n,]/) || ["9:00 AM"]).map((time, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-primary shrink-0" />
                                            <span>{time.trim()}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span>{settings.address || "Church Location"}</span>
                                    </div>
                                </div>
                                <p className="mt-4 font-sans text-xs text-neutral-600 leading-relaxed italic">
                                    "Come as you are. Leave changed."
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* CENTER: Brutalist Monitor with CRT Effects */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-6 order-1 lg:order-2"
                    >
                        <div className="relative border-4 border-white bg-neutral-950 p-2 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)]">
                            {/* Screen Bezels */}
                            <div className="relative bg-black aspect-video overflow-hidden group">
                                {/* RGB Split / Chromatic Aberration Effect on Hover */}
                                <div className="absolute inset-0 bg-transparent group-hover:animate-pulse z-30 pointer-events-none opacity-0 group-hover:opacity-20 mix-blend-color-dodge bg-[linear-gradient(90deg,red,blue,green)]" />

                                {/* REC Overlay */}
                                <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                                    <span className="font-mono text-xs text-red-600 font-bold tracking-widest text-shadow-glow">REC</span>
                                </div>
                                <div className="absolute top-4 right-4 font-mono text-xs text-white/50 tracking-widest z-20 flex items-center gap-2">
                                    <Radio className="w-3 h-3" /> CH-01
                                </div>

                                {/* Video */}
                                <video
                                    controls
                                    playsInline
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity contrast-125 sepia-[0.2]"
                                >
                                    <source src="/assets/weekly-schedule.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                                {/* CRT Scanline Animation */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%] opacity-20" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10%] w-full animate-scanline pointer-events-none z-10 opacity-30" />
                            </div>
                            
                            {/* Monitor Footer with Marquee */}
                            <div className="mt-2 bg-neutral-900 border-t-2 border-white/20 h-6 overflow-hidden relative flex items-center">
                                <div className="absolute whitespace-nowrap animate-marquee font-mono text-[10px] text-green-500 uppercase font-bold tracking-widest">
                                    /// Incoming Transmission from SBCC Headquarters /// Worship Service Sunday 9AM /// Prayer Meeting Wednesday 7PM /// Connected v2.0 ///
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT NOTE: Ministry Office (Yellow Note 3D) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50, rotate: 10 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
                        className="lg:col-span-3 lg:mt-8 order-3 group perspective-[1000px]"
                    >
                        <div className="relative bg-[#fef9c3] text-neutral-900 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] lg:rotate-[2deg] transition-all duration-300 transform-style-3d group-hover:rotate-x-12 group-hover:rotate-y-[-12deg] group-hover:shadow-[20px_20px_20px_0px_rgba(0,0,0,0.3)]">
                             {/* Tape */}
                             <div className="absolute -top-3 right-8 w-16 h-6 bg-white/40 rotate-3 backdrop-blur-sm shadow-sm" />

                            <h3 className="font-serif text-xl font-bold mb-4">
                                Ministry Office
                            </h3>
                            <div className="space-y-4 font-mono text-xs">
                                <div className="flex flex-col gap-1 border-b border-neutral-900/10 pb-2">
                                    <span className="font-bold uppercase tracking-wider text-neutral-500">Call Us</span>
                                    <span className="text-sm border-b border-transparent hover:border-black transition-colors w-fit">{settings.phone || "(+63) 123-456-7890"}</span>
                                </div>
                                <div className="flex flex-col gap-1 border-b border-neutral-900/10 pb-2">
                                    <span className="font-bold uppercase tracking-wider text-neutral-500">Email Us</span>
                                    <span className="text-sm break-words border-b border-transparent hover:border-black transition-colors w-fit">{settings.email || "info@sbcc.church"}</span>
                                </div>
                                <div className="pt-2">
                                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">Weekly Verse</span>
                                    <span className="italic block mb-1">"{weeklyVerse.text}"</span>
                                    <span className="block font-bold text-[10px] text-right">— {weeklyVerse.reference}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
