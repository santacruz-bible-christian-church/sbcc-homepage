import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Paperclip, Stamp, Archive, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSettings } from "@/contexts/SettingsContext";
import { useTeam } from "@/hooks";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const item = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    show: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 50 } }
};

import PageWrapper from "@/components/layout/PageWrapper";

export default function AboutPage() {
    const { settings } = useSettings();
    const { team, loading: teamLoading, error: teamError } = useTeam();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const statementItems = settings.statement_of_faith
        ? settings.statement_of_faith.split('\n').filter(line => line.trim())
        : [
            "We believe in the Holy Scriptures as the inspired and authoritative Word of God.",
            "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.",
            "We believe in the deity of our Lord Jesus Christ, His virgin birth, His sinless life, His miracles, His vicarious and atoning death, His bodily resurrection, and His ascension.",
            "We believe in the spiritual unity of believers in our Lord Jesus Christ."
        ];

    return (
        <PageWrapper className="min-h-screen bg-[#f0e6d2] text-neutral-900 font-mono antialiased overflow-x-hidden">
            <Navbar />

            {/* HEADER: Case File Cover */}
            <section className="relative pt-32 pb-20 px-6 border-b-2 border-dashed border-neutral-400">
                <div className="container mx-auto max-w-5xl relative">
                    {/* Background Stamps */}
                    <div className="absolute top-0 right-0 opacity-10 rotate-12 pointer-events-none select-none">
                        <div className="border-[8px] border-red-800 rounded-full w-64 h-64 flex items-center justify-center">
                            <span className="text-red-800 font-bold text-4xl uppercase -rotate-12 text-center leading-none">Kingdom Work</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="w-24 h-24 bg-neutral-900 text-white flex items-center justify-center rounded-sm shrink-0 shadow-lg rotate-[-3deg]">
                            <Archive className="w-10 h-10" />
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <span className="bg-red-700 text-white text-xs px-2 py-1 font-bold tracking-widest uppercase">
                                    Established
                                </span>
                                <span className="text-neutral-500 text-xs tracking-widest uppercase">
                                    Ministry Record #SBCC-1992
                                </span>
                            </div>
                            <h1 className="font-serif text-5xl md:text-7xl font-bold text-neutral-900 mb-6 uppercase tracking-tighter">
                                The Archives
                            </h1>
                            <p className="text-lg md:text-xl text-neutral-700 max-w-2xl font-serif italic border-l-4 border-red-700 pl-6 py-2 bg-white/50">
                                "{settings.tagline || 'A testimony of God\'s faithfulness through the years.'}"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT: The Dossier */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* LEFT COLUMN: History (Typewriter Page) */}
                        <div className="lg:col-span-7">
                            <div className="bg-white p-8 md:p-12 shadow-lg relative lg:rotate-1">
                                {/* Paper Clip */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-neutral-400">
                                    <Paperclip className="w-16 h-16 rotate-45 dropshadow-md" />
                                </div>
                                <div className="absolute top-4 right-4 text-xs font-bold uppercase text-neutral-300 border border-neutral-300 px-2 py-1">
                                    Copy 1 of 1
                                </div>

                                <h2 className="font-bold text-2xl mb-8 uppercase border-b-2 border-black pb-2 inline-block">
                                    // Our Journey
                                </h2>
                                
                                <div className="font-serif text-lg leading-relaxed text-neutral-800 space-y-6">
                                    <p>
                                        <span className="font-bold font-mono text-sm uppercase mr-2 text-neutral-500">[BEGINNINGS]:</span>
                                        {settings.history || "Founded in 1992, Santa Cruz Bible Christian Church has been a beacon of hope in our city for over three decades."}
                                    </p>
                                    <p>
                                        <span className="font-bold font-mono text-sm uppercase mr-2 text-neutral-500">[HEART]:</span>
                                        Our church is a place where everyone is welcome — whether you're exploring faith for the first time or have walked with Christ for years.
                                    </p>
                                    <div className="bg-[#f8f8f8] p-6 border-l-2 border-neutral-300 mt-8 italic text-neutral-600">
                                        "A testimony of transformative community and unwavering adherence to biblical truth."
                                        <div className="text-right mt-2 text-xs font-bold uppercase not-italic text-neutral-400">- Historical Note</div>
                                    </div>
                                </div>

                                {/* Mission & Vision Cards pinned to the paper */}
                                <div className="mt-12 grid gap-6">
                                    <div className="bg-yellow-50 p-6 border border-yellow-200 shadow-sm lg:rotate-[-1deg]">
                                        <h3 className="font-bold text-xs uppercase tracking-widest text-red-700 mb-2 border-b border-red-200 pb-1 w-max">Our Mission</h3>
                                        <p className="font-serif text-lg">{settings.mission}</p>
                                    </div>
                                    <div className="bg-blue-50 p-6 border border-blue-200 shadow-sm lg:rotate-[1deg]">
                                        <h3 className="font-bold text-xs uppercase tracking-widest text-blue-700 mb-2 border-b border-blue-200 pb-1 w-max">Our Vision</h3>
                                        <p className="font-serif text-lg">{settings.vision}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Evidence (Statement of Faith) */}
                        <div className="lg:col-span-5 space-y-8">
                           <div className="bg-neutral-900 text-neutral-200 p-8 shadow-2xl relative lg:-rotate-1">
                                <div className="absolute -left-3 top-10 w-2 h-16 bg-red-600/50 backdrop-blur-sm" /> {/* Tape */}
                                
                                <h2 className="font-mono text-xl font-bold mb-6 text-white flex items-center gap-2">
                                    <Fingerprint className="w-6 h-6 text-red-500" />
                                    CORE_VALUES
                                </h2>

                                <ul className="space-y-6 font-mono text-xs">
                                    {statementItems.map((item, index) => (
                                        <li key={index} className="flex gap-4 group">
                                            <span className="text-red-500 font-bold shrink-0">0{index + 1}.</span>
                                            <p className="opacity-80 group-hover:opacity-100 transition-opacity uppercase leading-relaxed">
                                                {item}
                                            </p>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 pt-4 border-t border-white/10 text-[10px] uppercase tracking-widest text-neutral-500 text-center">
                                    Founded on The Word
                                </div>
                           </div>
                           
                           {/* Decorative Image styled as Photo Evidence */}
                           <div className="bg-white p-3 shadow-md lg:rotate-2 transform hover:rotate-0 transition-transform duration-500">
                                <div className="aspect-video bg-neutral-200 relative overflow-hidden grayscale contrast-125 sepia-50">
                                    <img 
                                        src="/assets/church-interior.jpg" 
                                        className="w-full h-full object-cover mix-blend-multiply opacity-80" 
                                        alt="Evidence A"
                                    />
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                                </div>
                                <div className="mt-2 font-handwriting text-center text-sm text-blue-800 rotate-[-2deg]">
                                    Snapshot A: Worship
                                </div>
                            </div>

                           {/* Exhibit B: Pastoral Care (New Asset) */}
                           <div className="bg-white p-3 shadow-md lg:-rotate-1 transform hover:rotate-0 transition-transform duration-500 mt-8 relative">
                                <div className="absolute -top-3 left-10 w-32 h-8 bg-neutral-800/10 rotate-[2deg] backdrop-blur-sm shadow-sm z-10" />
                                <div className="aspect-video bg-neutral-200 relative overflow-hidden grayscale contrast-125">
                                    <img 
                                        src="/assets/pastor-preaching.jpg" 
                                        className="w-full h-full object-cover mix-blend-multiply opacity-90" 
                                        alt="Evidence B"
                                    />
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                                </div>
                                <div className="mt-2 font-handwriting text-center text-sm text-neutral-800 rotate-[1deg]">
                                    Snapshot B: Preaching
                                </div>
                           </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* TEAM: Personnel Grid (Polaroids) */}
            <section className="py-20 px-6 border-t-2 border-dashed border-neutral-400 bg-neutral-100">
                 <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="bg-black text-white px-2 py-1 uppercase text-xs font-bold tracking-widest inline-block -rotate-2 mb-2">
                            Ministry Team
                        </span>
                        <h2 className="font-serif text-4xl font-bold uppercase tracking-tight">Servant Leaders</h2>
                    </div>

                    <motion.div 
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-8 md:gap-12"
                    >
                        {teamLoading ? (
                            <div className="text-center font-mono animate-pulse">LOADING PERSONNEL DATA...</div>
                        ) : (
                            team.map((member, i) => (
                                <motion.div 
                                    key={member.id} 
                                    variants={item}
                                    whileHover={{ scale: 1.05, rotate: 0, transition: { type: "spring", stiffness: 300 } }}
                                    className={`bg-white p-4 shadow-xl w-[280px] relative group ${i % 2 === 0 ? 'lg:rotate-[-2deg]' : 'lg:rotate-[2deg]'}`}
                                >
                                    {/* Tape Strip */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-100/80 rotate-2 backdrop-blur-sm shadow-sm z-10 opacity-70" />

                                    <div className="aspect-square bg-neutral-200 mb-4 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-neutral-100">
                                        {member.photo ? (
                                             <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-300 font-bold text-4xl">?</div>
                                        )}
                                    </div>
                                    
                                    <div className="text-center font-serif">
                                        <h3 className="text-xl font-bold text-neutral-900 italic">
                                            {member.name}
                                        </h3>
                                        <p className="font-mono text-xs text-neutral-500 uppercase mt-1 tracking-widest">
                                            {member.title || member.role_display}
                                        </p>
                                    </div>
                                    
                                    {member.bio && (
                                        <div className="mt-4 pt-3 border-t border-dashed border-neutral-300 text-[10px] font-mono leading-tight text-neutral-600 text-justify">
                                            {member.bio}
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                 </div>
            </section>

            <Footer />
        </PageWrapper>
    );
}
