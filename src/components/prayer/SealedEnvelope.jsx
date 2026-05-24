import { motion } from "framer-motion";
import { CheckCircle2, RefreshCw } from "lucide-react";

export default function SealedEnvelope({ formData, onReset }) {
    return (
        <motion.div
            key="success-envelope"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: { type: "spring", stiffness: 100, damping: 12 }
            }}
            exit={{ opacity: 0, y: -200 }}
            className="max-w-xl mx-auto bg-[#FEFDF2] border-[3px] border-black p-8 md:p-12 shadow-2xl relative font-mono text-center flex flex-col justify-between h-[450px]"
        >
            {/* Airmail colored border overlay around envelope edges */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-repeat-x" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #ef4444 0, #ef4444 10px, transparent 10px, transparent 20px, #3b82f6 20px, #3b82f6 30px, transparent 30px, transparent 40px)" }}></div>
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-repeat-x" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #ef4444 0, #ef4444 10px, transparent 10px, transparent 20px, #3b82f6 20px, #3b82f6 30px, transparent 30px, transparent 40px)" }}></div>

            <div className="pt-6">
                <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mx-auto bg-black text-[#FEFDF2] mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-2xl font-black uppercase mb-3">Letter Sealed!</h2>
                <p className="text-xs text-neutral-500 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                    Your request has been folded, sealed, and dispatched heavenward. The prayer team will lift this up.
                </p>
            </div>

            {/* Envelope Address Labels Mock */}
            <div className="bg-neutral-100 p-4 border border-dashed border-neutral-300 text-left text-[10px] text-neutral-600 relative overflow-hidden">
                <div className="font-bold border-b border-neutral-200 pb-1 mb-1">DISPATCH DETS //</div>
                <div>TO: HEAVENLY DESK (PRAYER MINISTRY)</div>
                <div>FROM: {formData.isAnonymous ? "ANONYMOUS FAMILY" : formData.requesterName.toUpperCase()}</div>
                <div>ROUTE: PRIORITY_AIRMAIL</div>
                
                {/* Physical ink stamp overlay */}
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border border-red-600/30 rounded-full flex items-center justify-center rotate-12 pointer-events-none select-none text-[8px] text-red-600 font-bold leading-none uppercase mix-blend-multiply opacity-60">
                    SENT
                </div>
            </div>

            <button 
                onClick={onReset}
                className="mx-auto mt-6 flex items-center gap-2 border border-black bg-white px-4 py-2 hover:bg-neutral-50 text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-colors"
            >
                <RefreshCw className="w-3.5 h-3.5" /> Write another Letter
            </button>
        </motion.div>
    );
}
