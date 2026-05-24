import { motion, AnimatePresence } from "framer-motion";
import { Paperclip } from "lucide-react";

const HISTORY_RECORDS = {
    "1992": {
        title: "Dossier #1992: The Foundation",
        beginnings: "Founded in 1992, Santa Cruz Bible Christian Church started as a small, passionate Bible study group dedicated to living out the Gospel in the local community.",
        heart: "Under the guidance of early church leadership, our foundational values were firmly rooted in scriptural truth, spiritual unity, and active servant leadership.",
        quote: "Snapshot: A small group of believers gathered in a living room, praying for the city.",
        tag: "FOUNDATION_RECORD"
    },
    "2002": {
        title: "Dossier #2002: Early Years & Growth",
        beginnings: "As the congregation expanded, the church established structural roots, launching specialized youth services, community food banks, and regular mission trips.",
        heart: "The focus turned to intentional discipleship, helping new believers deepen their relationship with Christ and discover their spiritual gifts.",
        quote: "Snapshot: Dedication of the first official church community facility.",
        tag: "EXPANSION_RECORD"
    },
    "2012": {
        title: "Dossier #2012: Structural Expansion",
        beginnings: "Marked by massive community outreach, SBCC expanded to local mission partnerships and introduced hybrid live-stream capability to reach shut-ins.",
        heart: "Deepening our service footprints locally and abroad, cultivating global missions while holding fast to local neighborhood care.",
        quote: "Snapshot: Commissioning of the first foreign missionary team.",
        tag: "GLOBAL_OUTREACH"
    },
    "Present": {
        title: "Dossier #Present: Faithful Legacy",
        beginnings: "Celebrating over three decades of God's unwavering faithfulness. We continue to serve as a beacon of Hope, Grace, and Love, and are dedicated to living out the Gospel.",
        heart: "Our mission is unchanged: to know Christ and make Him known through passionate worship, deep discipleship, and active community transformation.",
        quote: "Snapshot: Multi-generational families worshiping together, serving the next generation.",
        tag: "ACTIVE_WITNESS"
    }
};

export default function DossierHistory({ settings, activeTab, setActiveTab, showStamp }) {
    return (
        <div className="bg-white p-8 md:p-12 shadow-2xl relative border-2 border-black min-h-[580px] flex flex-col justify-between overflow-hidden">
            {/* APPROVED Stamp physics */}
            <AnimatePresence>
                {showStamp && (
                    <motion.div
                        initial={{ scale: 3, opacity: 0, rotate: 20 }}
                        animate={{ 
                            scale: 1, 
                            opacity: 0.45, 
                            rotate: -12,
                            transition: { type: "spring", stiffness: 180, damping: 12, delay: 0.15 }
                        }}
                        className="absolute bottom-8 right-8 w-28 h-28 border-[3px] border-double border-red-700 rounded-full flex items-center justify-center pointer-events-none select-none mix-blend-multiply z-10 font-mono text-[9px] text-red-700 font-bold leading-none text-center"
                    >
                        <div className="border border-dashed border-red-700 rounded-full w-24 h-24 flex flex-col items-center justify-center">
                            <span>SBCC ARCHIVES</span>
                            <span className="font-serif text-sm font-black my-0.5 uppercase">VERIFIED</span>
                            <span>{HISTORY_RECORDS[activeTab].tag}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Paper Clip decoration */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-neutral-400 z-20">
                <Paperclip className="w-16 h-16 rotate-45 dropshadow-md" />
            </div>
            <div className="absolute top-4 right-4 text-[9px] font-mono font-bold uppercase text-neutral-300 border border-neutral-300 px-2 py-1">
                PAGE: {activeTab.toUpperCase()}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -10, rotate: -0.5 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, x: 10, rotate: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    <h2 className="font-mono font-black text-lg mb-6 uppercase border-b border-black/10 pb-2 inline-block">
                        // {HISTORY_RECORDS[activeTab].title}
                    </h2>
                    
                    <div className="font-serif text-lg leading-relaxed text-neutral-800 space-y-6 text-justify">
                        <p>
                            <span className="font-bold font-mono text-xs uppercase mr-2 text-neutral-400 tracking-wider">[JOURNAL_ENTRY]:</span>
                            {HISTORY_RECORDS[activeTab].beginnings}
                        </p>
                        <p>
                            <span className="font-bold font-mono text-xs uppercase mr-2 text-neutral-400 tracking-wider">[MINISTRY_CORE]:</span>
                            {HISTORY_RECORDS[activeTab].heart}
                        </p>
                        
                        <div className="bg-neutral-50 p-6 border-l-2 border-neutral-300 italic text-neutral-600 text-sm leading-relaxed mt-6">
                            "{HISTORY_RECORDS[activeTab].quote}"
                            <div className="text-right mt-2 text-[9px] font-mono font-bold uppercase not-italic text-neutral-400">
                                - Archive Note // {activeTab}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Mission & Vision Pinned Post-its */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-20">
                <div className="bg-yellow-50 p-5 border border-yellow-200 shadow-md rotate-[-1deg] hover:rotate-0 hover:scale-102 transition-all duration-300">
                    <h3 className="font-mono text-[9px] font-bold uppercase tracking-widest text-red-700 mb-2 border-b border-red-200 pb-1 w-max">
                        Our Mission
                    </h3>
                    <p className="font-serif text-sm leading-relaxed text-neutral-800">
                        {settings.mission || "To know Christ and make Him known through worship, discipleship, and service."}
                    </p>
                </div>
                <div className="bg-blue-50 p-5 border border-blue-200 shadow-md rotate-[1.5deg] hover:rotate-0 hover:scale-102 transition-all duration-300">
                    <h3 className="font-mono text-[9px] font-bold uppercase tracking-widest text-blue-700 mb-2 border-b border-blue-200 pb-1 w-max">
                        Our Vision
                    </h3>
                    <p className="font-serif text-sm leading-relaxed text-neutral-800">
                        {settings.vision || "To see our city transformed by the love and power of the Gospel, one life at a time."}
                    </p>
                </div>
            </div>
        </div>
    );
}
