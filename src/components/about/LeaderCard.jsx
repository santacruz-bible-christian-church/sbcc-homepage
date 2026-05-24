import { motion } from "framer-motion";

const itemVariant = {
    hidden: { opacity: 0, y: 30, rotate: -3 },
    show: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 60 } }
};

export default function LeaderCard({ member, index }) {
    return (
        <motion.div 
            variants={itemVariant}
            whileHover={{ 
                scale: 1.05, 
                rotate: 0, 
                y: -8, 
                shadow: "0 25px 30px -10px rgba(0,0,0,0.3)",
                transition: { type: "spring", stiffness: 350, damping: 15 } 
            }}
            className={`bg-white p-5 shadow-2xl border-2 border-black w-[290px] relative group transition-all duration-300 ${
                index % 2 === 0 ? 'lg:rotate-[-2deg]' : 'lg:rotate-[2deg]'
            }`}
        >
            {/* Tape Strip Holding Polaroid */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-yellow-100/70 border-l border-r border-black/5 rotate-2 backdrop-blur-sm shadow-sm z-20 mix-blend-multiply" />

            {/* The Polaroid image frame with filters */}
            <div className="aspect-square bg-neutral-200 mb-4 overflow-hidden border border-neutral-200 relative">
                {member.photo ? (
                     <img 
                        src={member.photo} 
                        alt={member.name} 
                        className="w-full h-full object-cover filter grayscale sepia-[0.3] group-hover:grayscale-0 group-hover:sepia-0 duration-700 transition-all" 
                        loading="lazy"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=222222&color=fff&size=200`;
                        }}
                     />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-white font-serif italic text-5xl font-black">
                        {member.name.charAt(0)}
                    </div>
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
            </div>
            
            <div className="text-center font-serif mt-2">
                <h3 className="text-xl font-bold text-neutral-900 italic group-hover:text-red-800 transition-colors leading-tight">
                    {member.name}
                </h3>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mt-1.5 border-t border-dashed border-neutral-200 pt-1">
                    {member.title || member.role_display}
                </p>
            </div>
            
            {member.bio && (
                <div className="mt-4 pt-3 border-t border-dashed border-neutral-300 text-[10px] font-mono leading-relaxed text-neutral-600 text-justify">
                    {member.bio}
                </div>
            )}
        </motion.div>
    );
}
