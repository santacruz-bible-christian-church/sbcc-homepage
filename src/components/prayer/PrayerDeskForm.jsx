import { motion } from "framer-motion";
import { AlertCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

export default function PrayerDeskForm({
    formData,
    status,
    errorMessage,
    onChange,
    onCategoryChange,
    onAnonymousChange,
    onSubmit
}) {
    const { settings } = useSettings();

    return (
        <motion.div
            key="desk-paper"
            initial={{ opacity: 1 }}
            exit={{ 
                opacity: 0, 
                y: -20,
                scale: 0.95,
                transition: { duration: 0.5, ease: "easeInOut" }
            }}
            className="bg-[#FEFDF2] border border-neutral-300 p-8 md:p-12 shadow-2xl relative min-h-[500px]"
            style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
                backgroundSize: "100% 2.25rem",
                lineHeight: "2.25rem"
            }}
        >
            {/* Ruled Left Margin Line (Red Letterhead Line) */}
            <div className="absolute left-[30px] md:left-[60px] top-0 bottom-0 w-[2px] bg-red-300 pointer-events-none" />

            {/* Airmail stamp sticker */}
            <div className="absolute top-8 right-8 w-24 h-24 border-2 border-dashed border-red-800/40 rounded-full flex items-center justify-center opacity-40 rotate-12 select-none pointer-events-none z-10 hidden sm:flex">
                <span className="font-mono text-[9px] uppercase text-center leading-tight text-red-800 font-bold">
                    Postage<br/>Paid By<br/>Christ
                </span>
            </div>

            {/* The Writing Desk Form */}
            <form onSubmit={onSubmit} className="relative z-10 pl-10 md:pl-16 space-y-6">
                
                {/* Dear Family Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-black/10 pb-4 mb-4">
                    <div className="font-handwriting-caveat text-4xl font-bold text-black select-none">
                        Dear Heavenly Father,
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase text-neutral-400">
                        <span>Send Anonymously</span>
                        <button
                            type="button"
                            onClick={() => onAnonymousChange(!formData.isAnonymous)}
                            className={`w-10 h-6 border-2 border-black rounded-none cursor-pointer flex items-center px-0.5 transition-colors ${
                                formData.isAnonymous ? "bg-black justify-end" : "bg-transparent justify-start"
                            }`}
                        >
                            <div className={`w-4 h-4 border border-black bg-white ${formData.isAnonymous ? "bg-yellow-400" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* Subject / Title line */}
                <div className="space-y-1">
                    <label htmlFor="title" className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold block">
                        Subject (Brief Need)
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="e.g. Guidance for the family, Healing"
                        required
                        value={formData.title}
                        onChange={onChange}
                        className="w-full bg-transparent border-0 border-b border-black/20 focus:border-black rounded-none outline-none font-handwriting-caveat text-2xl text-neutral-800 placeholder:text-neutral-400/40 py-1 transition-colors"
                    />
                </div>

                {/* Anonymous dynamic fields */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300 ${
                    formData.isAnonymous ? "opacity-20 pointer-events-none select-none" : "opacity-100"
                }`}>
                    <div className="space-y-1">
                        <label htmlFor="requesterName" className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold block">
                            My Name
                        </label>
                        <input
                            id="requesterName"
                            type="text"
                            placeholder="Your full name"
                            value={formData.requesterName}
                            onChange={onChange}
                            disabled={formData.isAnonymous}
                            required={!formData.isAnonymous}
                            className="w-full bg-transparent border-0 border-b border-black/20 focus:border-black rounded-none outline-none font-handwriting-caveat text-2xl text-neutral-800 placeholder:text-neutral-400/40 py-1"
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="requesterEmail" className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold block">
                            Return Address (Email)
                        </label>
                        <input
                            id="requesterEmail"
                            type="email"
                            placeholder="email@example.com (optional)"
                            value={formData.requesterEmail}
                            onChange={onChange}
                            disabled={formData.isAnonymous}
                            className="w-full bg-transparent border-0 border-b border-black/20 focus:border-black rounded-none outline-none font-handwriting-caveat text-2xl text-neutral-800 placeholder:text-neutral-400/40 py-1"
                        />
                    </div>
                </div>

                {/* Category tags selector */}
                <div className="space-y-2 pt-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold block">
                        Topic Tag
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                        {["health", "family", "financial", "spiritual", "relationships", "grief", "thanksgiving", "other"].map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => onCategoryChange(cat)}
                                className={`px-3 py-1 border border-neutral-300 font-mono text-[10px] uppercase font-bold cursor-pointer transition-all ${
                                    formData.category === cat 
                                        ? "bg-black text-[#FEFDF2] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" 
                                        : "hover:bg-black/5 bg-white text-neutral-600 hover:text-black"
                                }`}
                            >
                                {formData.category === cat ? "✓ " : ""}{cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Letter Body message */}
                <div className="space-y-2 pt-4">
                    <label htmlFor="description" className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold block">
                        My Prayer Request / Letter
                    </label>
                    <textarea
                        id="description"
                        placeholder="Write your prayer here... I trust in Your promises..."
                        required
                        rows={10}
                        value={formData.description}
                        onChange={onChange}
                        className="w-full bg-transparent border-none outline-none resize-none font-handwriting-caveat text-3xl text-neutral-900 leading-[2.25rem] placeholder:text-neutral-400/40"
                        style={{
                            backgroundAttachment: "local",
                            backgroundImage: "linear-gradient(transparent, transparent 35px, #eaeaea 35px)",
                            backgroundSize: "100% 36px"
                        }}
                    />
                </div>

                {/* Error Alert Display */}
                {status === "error" && errorMessage && (
                    <div className="p-4 border-2 border-dashed border-red-500 bg-red-50/50 text-red-700 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {errorMessage}
                    </div>
                )}

                {/* Send Button */}
                <div className="pt-6 flex justify-end border-t border-black/10">
                    <Button
                        type="submit"
                        disabled={status === "submitting"}
                        className="h-auto py-4 px-10 bg-black text-white hover:bg-neutral-800 rounded-none border-2 border-transparent hover:border-black transition-all font-mono uppercase tracking-widest text-xs font-bold flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,0,0.1)] hover:translate-y-px cursor-pointer"
                    >
                        {status === "submitting" ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Sealing Letter...</>
                        ) : (
                            <><Send className="w-4 h-4" /> Seal & Send Letter</>
                        )}
                    </Button>
                </div>

            </form>
        </motion.div>
    );
}
