import { motion, AnimatePresence } from "framer-motion";

export default function ClippedTicketToast({ toast, onClose }) {
    return (
        <AnimatePresence>
            {toast && (
                <motion.div
                    initial={{ y: 100, opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ y: 0, opacity: 1, scale: 1, rotate: 1 }}
                    exit={{ y: 100, opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="fixed bottom-6 right-6 z-50 bg-[#FFFF88] text-neutral-900 border-2 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-80 font-mono text-xs select-none"
                >
                    {/* Perforated Receipt Top Edge */}
                    <div 
                        className="absolute top-0 left-0 right-0 h-2 bg-repeat-x bg-[length:12px_8px] -translate-y-[6px]"
                        style={{ backgroundImage: "radial-gradient(circle, #171717 4px, transparent 4px)" }} 
                    />
                    
                    <div className="flex justify-between items-center border-b border-black/20 pb-2 mb-3">
                        <span className="font-black text-neutral-500 tracking-wider">// TICKET CLIPPED</span>
                        <button 
                            onClick={onClose} 
                            className="text-[9px] border border-black px-1.5 py-0.5 bg-black text-[#FFFF88] hover:bg-neutral-800 transition-colors uppercase font-black cursor-pointer"
                        >
                            CLOSE
                        </button>
                    </div>
                    
                    <div className="space-y-1.5">
                        <div className="font-black text-sm uppercase tracking-tight text-black leading-none">
                            {toast.title}
                        </div>
                        <div className="text-[10px] text-neutral-700 truncate font-bold">
                            EVENT: {toast.event}
                        </div>
                        <div className="text-[9px] text-neutral-500 font-bold border-t border-dashed border-black/10 pt-2 mt-2">
                            INFO COPIED TO CLIPBOARD
                        </div>
                    </div>

                    {/* Receipt Barcode */}
                    <div className="mt-4 flex items-center justify-between h-4 opacity-60">
                        <div className="flex gap-[1px] items-stretch h-full w-full">
                            {[1, 2, 4, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 1, 2].map((w, idx) => (
                                <div key={idx} className="bg-black" style={{ flexGrow: w }} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
