import { useState } from "react";
import { Calendar, Loader2, Newspaper, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    useAnnouncements,
    useScrollToTop,
    formatDateBox,
    formatFullDate,
    formatRelativeTime,
} from "@/hooks";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
};

import PageWrapper from "@/components/layout/PageWrapper";

export default function AnnouncementsPage() {
    useScrollToTop();
    const { announcements, loading, error, featuredAnnouncement, restAnnouncements } = useAnnouncements({ limit: 20 });
    
    // Get current date for the masthead
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const [isCopied, setIsCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: featuredAnnouncement?.title || "SBCC Announcements",
            text: `Check out this announcement from SBCC: ${featuredAnnouncement?.title}`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareData.url);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    return (
        <PageWrapper className="min-h-screen bg-[#f4f1ea] font-serif text-neutral-900 selection:bg-neutral-900 selection:text-[#f4f1ea]">
            <Navbar />

            {/* HEADER: Masthead */}
            <header className="pt-32 pb-8 px-6 border-b-4 border-black">
                <div className="container mx-auto max-w-6xl text-center">
                    <div className="border-b-2 border-black pb-2 mb-2 flex justify-between items-end font-sans text-xs font-bold tracking-widest uppercase">
                        <span>Vol. XXXII</span>
                        <span>Santa Cruz Bible Christian Church</span>
                        <span>Est. 1992</span>
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-4 scale-y-110">
                        The Good News
                    </h1>
                    
                    <div className="border-t-2 border-b-2 border-black py-2 flex justify-between items-center font-sans text-sm font-bold uppercase tracking-widest">
                        <span>{today}</span>
                        <div className="flex items-center gap-2">
                             <Newspaper className="w-4 h-4" />
                             <span>Kingdom Edition</span>
                        </div>
                        <span>Price: Paid in Full</span>
                    </div>
                </div>
            </header>

            {/* CONTENT: Newspaper Grid */}
            <section className="py-12 px-6">
                <div className="container mx-auto max-w-6xl">
                    {loading ? (
                         <div className="flex flex-col items-center justify-center py-20">
                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
                             <p className="font-mono text-xs uppercase tracking-widest">Fetching latest news...</p>
                         </div>
                    ) : error ? (
                        <div className="text-center py-20 border-2 border-black p-12 max-w-lg mx-auto bg-white lg:rotate-1">
                            <h3 className="text-2xl font-bold mb-2 uppercase">Printing Error</h3>
                            <p className="font-sans text-sm">{error?.status === 429 ? "Please wait a moment." : "Check connection."}</p>
                        </div>
                    ) : announcements.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-4xl font-bold uppercase mb-4">Extra! Extra!</h3>
                            <p className="font-sans">No news is good news? Check back later.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            
                            {/* MAIN COLUMN (Featured) - Spans 8 cols */}
                            <div className="lg:col-span-8 flex flex-col gap-12">
                                {featuredAnnouncement && (
                                    <article className="border-b-2 border-neutral-300 pb-12">
                                        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 font-sans text-xs font-bold uppercase tracking-tight text-neutral-500 border-b border-black pb-2">
                                            <div className="flex items-center gap-2">
                                                <span>{formatFullDate(featuredAnnouncement.publish_at)}</span>
                                                {featuredAnnouncement.ministry_name && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="text-neutral-900 bg-neutral-200 px-1">
                                                            {featuredAnnouncement.ministry_name}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span>{Math.ceil(featuredAnnouncement.body.split(' ').length / 200)} min read</span>
                                                <button 
                                                    onClick={handleShare}
                                                    className="flex items-center gap-1 hover:text-black transition-colors"
                                                >
                                                    {isCopied ? <Check className="w-3 h-3 text-green-600" /> : <Share2 className="w-3 h-3" />}
                                                    {isCopied ? <span className="text-green-600 font-bold">Copied!</span> : "Social"}
                                                </button>
                                            </div>
                                        </div>

                                        <h2 className="text-5xl md:text-6xl font-bold leading-[0.9] mb-6 hover:underline decoration-4 underline-offset-4 cursor-pointer">
                                            {featuredAnnouncement.title}
                                        </h2>

                                        <div className="mb-8 border-2 border-black p-1 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                            <div className="grayscale contrast-125 hover:grayscale-0 transition-all duration-500 overflow-hidden relative">
                                                <img 
                                                    src={featuredAnnouncement.photo} 
                                                    alt={featuredAnnouncement.title} 
                                                    className="w-full h-auto object-cover opacity-90"
                                                />
                                                {/* Halftone Overlay */}
                                                <div className="absolute inset-0 bg-[radial-gradient(circle,theme('colors.neutral.900')_1px,transparent_1px)] bg-[length:4px_4px] opacity-20 pointer-events-none"></div>
                                            </div>
                                            <div className="flex justify-between items-center mt-2 px-1">
                                                <div className="h-px bg-neutral-300 flex-grow mr-4"></div>
                                                <p className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 whitespace-nowrap">
                                                    Fig 1.1 — Photo courtesy of Media Team
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-neutral-900 text-lg leading-relaxed text-justify hyphens-auto font-serif">
                                            {featuredAnnouncement.body.split('\n').filter(Boolean).slice(0, 1).map((paragraph, index) => (
                                                <p key={index} className="mb-4">
                                                    <span className="font-bold uppercase tracking-widest text-sm mr-1 font-sans">
                                                        {paragraph.split(' ').slice(0, 3).join(' ')}
                                                    </span>
                                                    <span className="text-xl">
                                                        {paragraph.split(' ').slice(3).join(' ')}
                                                        <span className="text-neutral-400">...</span>
                                                    </span>
                                                </p>
                                            ))}
                                        </div>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div className="mt-8 flex justify-center">
                                                    <Button variant="outline" className="font-sans font-bold uppercase tracking-widest text-xs border-2 border-black hover:bg-black hover:text-white rounded-none px-8 py-6 transition-all">
                                                        Read Full Article on Page 4
                                                    </Button>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f4f1ea] border-2 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                                                <DialogHeader>
                                                    <DialogTitle className="text-4xl font-serif font-black uppercase mb-4 leading-none">{featuredAnnouncement.title}</DialogTitle>
                                                    <DialogDescription className="font-sans text-xs uppercase tracking-widest text-neutral-500 border-b border-neutral-300 pb-4 mb-4">
                                                        {formatFullDate(featuredAnnouncement.publish_at)}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="font-serif text-lg leading-relaxed space-y-4">
                                                    {featuredAnnouncement.photo && (
                                                        <img src={featuredAnnouncement.photo} className="w-full grayscale contrast-125 mb-6 border border-black" alt="Detail" />
                                                    )}
                                                    <p className="whitespace-pre-line">{featuredAnnouncement.body}</p>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </article>
                                )}
                            </div>

                            {/* SIDE COLUMN (Headlines) - Spans 4 cols */}
                            <motion.div 
                                className="lg:col-span-4 border-t-2 lg:border-t-0 lg:border-l-2 border-black pt-8 lg:pt-0 lg:pl-8 lg:ml-4 flex flex-col gap-8"
                                variants={container}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            >
                                <motion.h3 variants={item} className="font-sans font-black text-xl uppercase border-b-4 border-black pb-2">
                                    In Other News
                                </motion.h3>

                                {restAnnouncements.map((item) => (
                                    <motion.div key={item.key} variants={item} className="group cursor-pointer">
                                        <div className="mb-2 font-sans text-[10px] font-bold uppercase text-neutral-500 flex justify-between">
                                            <span>{formatRelativeTime(item.publish_at)}</span>
                                            {item.ministry_name && <span className="bg-black text-white px-1">{item.ministry_name}</span>}
                                        </div>
                                        
                                        <h4 className="text-2xl font-bold leading-tight mb-3 group-hover:underline decoration-2 underline-offset-2">
                                            {item.title}
                                        </h4>
                                        
                                        <p className="text-sm leading-snug text-neutral-600 line-clamp-3 mb-3 border-l-2 border-neutral-300 pl-3">
                                            {item.body}
                                        </p>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="font-sans text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white px-2 py-1 transition-colors border border-black">
                                                    Read
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-2xl bg-[#f4f1ea] border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-0 overflow-hidden">
                                                {item.photo && (
                                                    <div className="relative h-48 w-full border-b-2 border-black overflow-hidden group-hover:contrast-125 transition-all">
                                                        <img 
                                                            src={item.photo} 
                                                            alt={item.title} 
                                                            className="w-full h-full object-cover grayscale contrast-125"
                                                        />
                                                        <div className="absolute inset-0 bg-[radial-gradient(circle,theme('colors.neutral.900')_1px,transparent_1px)] bg-[length:4px_4px] opacity-20 pointer-events-none"></div>
                                                    </div>
                                                )}
                                                <div className="p-6 md:p-8">
                                                     <div className="mb-4 flex flex-wrap gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-500 border-b border-neutral-300 pb-4">
                                                        <span>{formatFullDate(item.publish_at)}</span>
                                                        {item.ministry_name && (
                                                            <>
                                                                <span>•</span>
                                                                <span className="text-black">{item.ministry_name}</span>
                                                            </>
                                                        )}
                                                     </div>
                                                     <h2 className="text-3xl font-serif font-black mb-6 leading-none uppercase">{item.title}</h2>
                                                     <p className="font-serif text-lg leading-relaxed whitespace-pre-line text-neutral-800">{item.body}</p>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                        
                                        <div className="w-full h-px bg-neutral-300 mt-8"></div>
                                    </motion.div>
                                ))}

                                {/* Ad / Filler */}
                                <motion.div variants={item} className="border-4 border-double border-neutral-400 p-6 text-center mt-8 opacity-70 lg:rotate-1">
                                    <p className="font-sans text-xs font-bold uppercase mb-2">Advertisement</p>
                                    <h4 className="font-black text-xl uppercase mb-2">Join a Small Group</h4>
                                    <p className="font-serif italic text-sm mb-4">"Life is better together."</p>
                                    <div className="inline-block border border-black px-4 py-1 font-sans text-xs font-bold uppercase">Call Now</div>
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </PageWrapper>
    );
}
