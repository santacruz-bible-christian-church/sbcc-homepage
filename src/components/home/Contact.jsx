import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Clock, Navigation, Radio, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
};

export default function Contact() {
    const { settings } = useSettings();

    const socialLinks = [
        { icon: Facebook, href: settings.facebook_url, label: "FACEBOOK" },
        { icon: Instagram, href: settings.instagram_url, label: "INSTAGRAM" },
        { icon: Youtube, href: settings.youtube_url, label: "YOUTUBE" },
    ].filter(link => link.href);

    return (
        <section id="contact" className="py-24 md:py-32 bg-neutral-100 border-t border-b border-black overflow-hidden">
            <div className="container mx-auto px-6">
                
                {/* Tactical Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-black pb-4">
                    <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-2 block">
                            // Ways to Reach Us
                        </span>
                        <h2 className="font-serif text-5xl md:text-7xl text-black uppercase tracking-tighter">
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, staggerChildren: 0.1 }}
                            >
                                Connect<br/>With Us
                            </motion.span>
                        </h2>
                    </div>
                    <div className="hidden md:block text-right font-mono text-xs text-neutral-400">
                        <div className="animate-pulse text-green-600 font-bold mb-1">● OFFICE OPEN</div>
                        <div>READY TO SERVE YOU</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* LEFT: Field Reports (Index Cards) */}
                    <motion.div 
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="lg:col-span-5 space-y-6"
                    >
                        {/* Address File */}
                        <motion.div variants={item} className="bg-[#f0e6d2] p-6 shadow-md border-l-4 border-yellow-600 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                            <div className="absolute top-2 right-2 text-yellow-800/20 font-mono text-4xl font-bold rotate-12 select-none">FILE_01</div>
                             {/* Paper Texture Overlay */}
                             <div className="absolute inset-0 bg-neutral-900/5 mix-blend-multiply pointer-events-none" />
                            
                            <div className="relative z-10">
                                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 border-b border-neutral-400/50 pb-1 w-max">
                                    Our Location
                                </h3>
                                <div className="flex items-start gap-4 mb-4">
                                    <MapPin className="w-5 h-5 text-neutral-800 mt-1" />
                                    <div>
                                        <p className="font-mono text-lg text-neutral-900 leading-tight">
                                            {settings.address || '440 Frederick St, Santa Cruz, CA 95062'}
                                        </p>
                                    </div>
                                </div>
                                <Button 
                                    variant="outline" 
                                    className="w-full border-2 border-neutral-800 bg-transparent text-neutral-800 font-bold hover:bg-neutral-800 hover:text-[#f0e6d2] rounded-none uppercase tracking-wider"
                                    asChild
                                >
                                    <a 
                                        href={`https://maps.google.com/?q=${encodeURIComponent(settings.address?.replace(/\n/g, ', ') || settings.church_name || '')}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <Target className="w-4 h-4 mr-2" /> Get Directions
                                    </a>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Comms Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Phone Card */}
                            <motion.a 
                                variants={item}
                                href={`tel:${settings.phone?.replace(/[^\d+]/g, '') || ''}`}
                                className="bg-white p-5 border-2 border-dashed border-neutral-300 hover:border-black hover:bg-neutral-50 transition-all duration-300 flex flex-col justify-between group h-full"
                            >
                                <div>
                                    <div className="font-mono text-[10px] uppercase text-neutral-400 mb-2">Phone</div>
                                    <Phone className="w-6 h-6 text-neutral-600 mb-2 group-hover:text-black" />
                                    <p className="font-mono text-sm font-bold text-neutral-800 break-words">
                                        {settings.phone || '(+63) 917-222-2222'}
                                    </p>
                                </div>
                                <div className="mt-4 text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-black">
                                    Tap to Call -&gt;
                                </div>
                            </motion.a>

                            {/* Email Card */}
                            <motion.a 
                                variants={item}
                                href={`mailto:${settings.email || ''}`}
                                className="bg-white p-5 border-2 border-dashed border-neutral-300 hover:border-black hover:bg-neutral-50 transition-all duration-300 flex flex-col justify-between group h-full"
                            >
                                <div>
                                    <div className="font-mono text-[10px] uppercase text-neutral-400 mb-2">Email</div>
                                    <Mail className="w-6 h-6 text-neutral-600 mb-2 group-hover:text-black" />
                                    <p className="font-mono text-sm font-bold text-neutral-800 break-all">
                                        {settings.email || '1992.sbcc@gmail.com'}
                                    </p>
                                </div>
                                <div className="mt-4 text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-black">
                                    Send Email -&gt;
                                </div>
                            </motion.a>
                        </div>

                        {/* Social Signals */}
                        <motion.div variants={item} className="bg-black/5 p-4 rounded-sm border border-black/10">
                             <div className="font-mono text-[10px] uppercase text-neutral-500 mb-3 flex items-center gap-2">
                                <Radio className="w-3 h-3" /> Follow Us Online
                             </div>
                             <div className="flex gap-4">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                        title={link.label}
                                    >
                                        <link.icon className="w-4 h-4" />
                                    </a>
                                ))}
                             </div>
                        </motion.div>

                        {/* Media Uplink (New Asset) */}
                        <motion.div variants={item} className="bg-white p-3 shadow-md rotate-1 transform hover:rotate-0 transition-transform duration-500 mt-6 relative group">
                            <div className="absolute -top-3 right-10 w-24 h-6 bg-red-600/20 rotate-[-2deg] backdrop-blur-sm shadow-sm z-10" />
                            <div className="aspect-[21/9] bg-neutral-900 relative overflow-hidden grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700">
                                <img 
                                    src="/assets/livestream-setup.jpg" 
                                    className="w-full h-full object-cover opacity-80" 
                                    alt="Media Control Room"
                                />
                                {/* Scanline */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
                                <div className="absolute top-2 left-2 text-[10px] text-green-500 font-mono animate-pulse">
                                    ● SIGNAL_ACTIVE
                                </div>
                            </div>
                            <div className="mt-2 flex justify-between items-center font-mono text-[10px] uppercase text-neutral-500">
                                <span>Media Ministry</span>
                                <span>Spreading the Gospel Online</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: Satellite Map (Tactical Screen) */}
                    <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[500px] relative bg-black border-[4px] border-black shadow-2xl">
                         {/* Scanline Overlay */}
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[length:100%_4px,3px_100%] opacity-20" />
                        
                        {/* Targeting Reticle */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 1.5 }}
                            whileInView={{ opacity: 0.5, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
                        >
                            <div className="w-64 h-64 border border-red-500/30 rounded-full flex items-center justify-center relative">
                                <div className="absolute w-full h-[1px] bg-red-500/30" />
                                <div className="absolute h-full w-[1px] bg-red-500/30" />
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                            </div>
                            {/* Corner Markers */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-red-500/50" />
                            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-red-500/50" />
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-red-500/50" />
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-red-500/50" />
                        </motion.div>
                        
                        {/* Status Text */}
                        <div className="absolute bottom-4 left-4 z-30 font-mono text-xs text-green-500 bg-black/80 px-2 py-1">
                            SAT_FEED_LIVE // {new Date().getFullYear()}
                        </div>

                        {/* The Map */}
                        <iframe
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.church_name || 'Santa Cruz Bible Christian Church, Santa Cruz, Philippines')}&output=embed`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Church Location"
                            className="w-full h-full filter grayscale contrast-125 sepia-[0.3] invert-[0.1] opacity-60 hover:opacity-80 transition-opacity duration-700"
                        ></iframe>
                    </div>

                </div>
            </div>
        </section>
    );
}
