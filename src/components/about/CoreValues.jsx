import { Fingerprint } from "lucide-react";

export default function CoreValues({ statementItems, settings }) {
    return (
        <div className="space-y-8">
            <div className="bg-neutral-900 text-neutral-200 p-8 shadow-2xl border-2 border-black relative lg:-rotate-1">
                <div className="absolute -left-3 top-10 w-2.5 h-16 bg-red-600/60 backdrop-blur-sm shadow-sm" /> {/* Tape */}
                
                <h2 className="font-mono text-sm font-bold mb-6 text-white flex items-center gap-2 tracking-widest">
                    <Fingerprint className="w-5 h-5 text-red-500" />
                    // STATEMENT_OF_FAITH
                </h2>

                <ul className="space-y-5 font-mono text-[10px] leading-relaxed uppercase">
                    {statementItems.map((item, index) => (
                        <li key={index} className="flex gap-4 group">
                            <span className="text-red-500 font-bold shrink-0">0{index + 1}.</span>
                            <p className="opacity-80 group-hover:opacity-100 transition-opacity">
                                {item}
                            </p>
                        </li>
                    ))}
                </ul>

                <div className="mt-8 pt-4 border-t border-white/10 text-[9px] uppercase tracking-widest text-neutral-500 text-center">
                    Founded on The Word // Est. 1992
                </div>
            </div>
           
            {/* Decorative Image styled as Photo Evidence */}
            <div className="bg-white p-3 shadow-xl border border-black lg:rotate-2 transform hover:rotate-0 hover:scale-102 transition-all duration-500 group">
                <div className="aspect-video bg-neutral-200 relative overflow-hidden grayscale sepia-[0.35] group-hover:grayscale-0 group-hover:sepia-0 duration-700 transition-all">
                    <img 
                        src="/assets/church-interior.jpg" 
                        className="w-full h-full object-cover mix-blend-multiply opacity-80" 
                        alt="Evidence A"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=2070&auto=format&fit=crop';
                        }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[length:4px_4px] opacity-25 pointer-events-none"></div>
                </div>
                <div className="mt-2.5 font-handwriting-caveat text-center text-lg text-blue-800 rotate-[-2deg] select-none">
                    Snapshot A: House of Worship
                </div>
            </div>

            {/* Exhibit B: Pastoral Care (New Asset) */}
            <div className="bg-white p-3 shadow-xl border border-black lg:-rotate-1 transform hover:rotate-0 hover:scale-102 transition-all duration-500 group mt-8 relative">
                <div className="absolute -top-3 left-10 w-32 h-6 bg-yellow-100/70 border-l border-r border-black/5 rotate-[2deg] backdrop-blur-sm shadow-sm z-10 mix-blend-multiply" />
                <div className="aspect-video bg-neutral-200 relative overflow-hidden grayscale sepia-[0.25] group-hover:grayscale-0 group-hover:sepia-0 duration-700 transition-all">
                    <img 
                        src="/assets/pastor-preaching.jpg" 
                        className="w-full h-full object-cover mix-blend-multiply opacity-90" 
                        alt="Evidence B"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop';
                        }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[length:4px_4px] opacity-25 pointer-events-none"></div>
                </div>
                <div className="mt-2.5 font-handwriting-caveat text-center text-lg text-neutral-800 rotate-[1deg] select-none">
                    Snapshot B: Proclaiming The Word
                </div>
            </div>
        </div>
    );
}
