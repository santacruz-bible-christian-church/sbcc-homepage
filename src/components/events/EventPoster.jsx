import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { formatDateBoxExtended, formatTime } from "@/hooks";

const POSTER_COLORS = [
    "bg-[#FF00FF] text-black", // Hot Pink
    "bg-[#00FFFF] text-black", // Cyan
    "bg-[#FFFF00] text-black", // Neon Yellow
    "bg-[#FF3300] text-black", // Bright Red
    "bg-white text-black",     // Stark White
    "bg-black text-white",     // Inverted
];

const ROTATIONS = [
    "lg:rotate-1",
    "lg:-rotate-1",
    "lg:rotate-2",
    "lg:-rotate-2",
    "lg:rotate-0",
];

const itemVariant = {
    hidden: { opacity: 0, scale: 0.9, rotate: -2 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 50 } }
};

export default function EventPoster({ event, tornTabs = [], onTearOff }) {
    const dateObj = formatDateBoxExtended(event.date);
    const time = formatTime(event.date);

    // Encapsulate visual traits based on unique event ID
    const getPosterTraits = (id) => {
        const idNum = typeof id === 'string' ? id.charCodeAt(0) : id;
        const colorIndex = idNum % POSTER_COLORS.length;
        const rotateIndex = idNum % ROTATIONS.length;
        return {
            color: POSTER_COLORS[colorIndex],
            rotation: ROTATIONS[rotateIndex]
        };
    };

    const traits = getPosterTraits(event.id);

    return (
        <motion.article 
            variants={itemVariant}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 10, transition: { type: "spring", stiffness: 300 } }}
            className="relative group break-inside-avoid mb-6"
        >
            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/20 backdrop-blur-sm shadow-sm rotate-2 z-20"></div>

            <div className={`p-6 shadow-2xl ${traits.color} ${traits.rotation} pb-16 transition-all duration-300 relative`}>
                <div className="border-4 border-current p-4 h-full flex flex-col justify-between">
                    
                    {/* Header: Date */}
                    <div className="flex justify-between items-start mb-6 border-b-2 border-current pb-4">
                        <div className="flex flex-col leading-none">
                            <span className="text-xs font-bold uppercase tracking-widest mb-1">{dateObj.month}</span>
                            <span className="text-6xl font-black tracking-tighter">{dateObj.day}</span>
                        </div>
                        <div className="text-right font-mono text-xs font-bold uppercase">
                            {dateObj.year}
                        </div>
                    </div>

                    {/* Content: Title & Info */}
                    <div className="mb-8">
                        <h2 className="text-4xl leading-[0.9] font-black uppercase mb-4 break-words hyphens-auto">
                            {event.title}
                        </h2>
                        
                        {event.description && (
                            <p className="font-mono text-xs uppercase leading-relaxed line-clamp-4 border-l-2 border-current pl-3">
                                {event.description}
                            </p>
                        )}
                    </div>

                    {/* Footer: Details */}
                    <div className="space-y-2 font-bold uppercase text-sm tracking-tight">
                        {time && (
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 flex-shrink-0" />
                                <span>DOORS: {time}</span>
                            </div>
                        )}
                        {event.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{event.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Interactive Tear-off Tabs (Bottom) */}
                <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 pb-1 overflow-hidden h-12 pointer-events-none">
                    {[...Array(6)].map((_, i) => {
                        const isTorn = tornTabs.includes(i);
                        return (
                            <motion.div
                                key={i}
                                onClick={() => onTearOff(event, i)}
                                animate={isTorn ? {
                                    y: 80,
                                    rotate: i % 2 === 0 ? -20 : 20,
                                    opacity: 0,
                                    transition: { duration: 0.5, ease: "easeIn" }
                                } : {}}
                                whileHover={isTorn ? {} : { y: -3, scale: 1.05 }}
                                className={`w-[14%] h-12 border-l border-r border-dashed border-current flex items-end justify-center pb-2 text-[8px] font-mono transition-all cursor-pointer pointer-events-auto select-none origin-top ${
                                    isTorn 
                                        ? "opacity-0 pointer-events-none" 
                                        : "opacity-60 hover:opacity-100 hover:bg-black/15 text-current"
                                }`}
                            >
                                <span className="-rotate-90 origin-bottom translate-y-2 whitespace-nowrap tracking-tighter">
                                    {isTorn ? "RIPPED" : "TAKE ONE"}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.article>
    );
}
