import { useEffect, useState } from "react";
import { Archive } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSettings } from "@/contexts/SettingsContext";
import { useTeam } from "@/hooks";
import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import DossierHistory from "@/components/about/DossierHistory";
import CoreValues from "@/components/about/CoreValues";
import LeaderCard from "@/components/about/LeaderCard";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

export default function AboutPage() {
    const { settings } = useSettings();
    const { team, loading: teamLoading } = useTeam();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeTab, setActiveTab] = useState("1992");
    const [showStamp, setShowStamp] = useState(true);

    // Trigger rubber stamp action on tab change
    useEffect(() => {
        setShowStamp(false);
        const timer = setTimeout(() => setShowStamp(true), 50);
        return () => clearTimeout(timer);
    }, [activeTab]);

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
            <section className="py-20 px-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-[0.02]">
                <div className="container mx-auto max-w-6xl">
                    
                    {/* Dossier Tabs Navigation */}
                    <div className="flex flex-wrap gap-2 mb-4 max-w-5xl mx-auto pl-2 relative z-20">
                        {["1992", "2002", "2012", "Present"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2.5 border-2 border-black font-mono text-xs uppercase font-bold cursor-pointer transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] ${
                                    activeTab === tab 
                                        ? "bg-black text-[#f0e6d2] border-black" 
                                        : "bg-white text-neutral-600 hover:text-black hover:bg-neutral-50"
                                }`}
                            >
                                📂 {tab === "Present" ? "Present" : `${tab}s`}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                        
                        {/* LEFT COLUMN: History (Interactive Dossier Component) */}
                        <div className="lg:col-span-7">
                            <DossierHistory
                                settings={settings}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                showStamp={showStamp}
                            />
                        </div>

                        {/* RIGHT COLUMN: Evidence (Core Values Statement Component) */}
                        <div className="lg:col-span-5">
                            <CoreValues
                                statementItems={statementItems}
                                settings={settings}
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* TEAM: Personnel Grid */}
            <section className="py-20 px-6 border-t-2 border-dashed border-neutral-400 bg-neutral-100 relative z-20">
                 <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="bg-black text-[#f0e6d2] px-3 py-1.5 uppercase text-xs font-mono font-bold tracking-widest inline-block -rotate-2 mb-2 shadow-sm">
                            Ministry Team
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold uppercase tracking-tight">Servant Leaders</h2>
                    </div>

                    <motion.div 
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-8 md:gap-12"
                    >
                        {teamLoading ? (
                            <div className="text-center font-mono animate-pulse text-xs uppercase tracking-widest py-10">
                                Shuffling personnel dossiers...
                            </div>
                        ) : (
                            team.map((member, i) => (
                                <LeaderCard
                                    key={member.id}
                                    member={member}
                                    index={i}
                                />
                            ))
                        )}
                    </motion.div>
                 </div>
            </section>

            <Footer />
        </PageWrapper>
    );
}
