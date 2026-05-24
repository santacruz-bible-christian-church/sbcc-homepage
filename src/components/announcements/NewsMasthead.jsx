/**
 * NewsMasthead
 *
 * The newspaper-style masthead header for the Announcements page.
 * Renders the volume/edition row, giant title, and date/edition footer row.
 */
export default function NewsMasthead({ today }) {
    return (
        <header className="pt-32 pb-8 px-6 border-b-4 border-black">
            <div className="container mx-auto max-w-6xl text-center">
                {/* Edition Info Row */}
                <div className="border-b-2 border-black pb-2 mb-2 flex justify-between items-end font-sans text-xs font-bold tracking-widest uppercase">
                    <span>Vol. XXXII</span>
                    <span>Santa Cruz Bible Christian Church</span>
                    <span>Est. 1992</span>
                </div>

                {/* Giant Masthead Title */}
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-4 scale-y-110">
                    The Good News
                </h1>

                {/* Date / Edition Footer Row */}
                <div className="border-t-2 border-b-2 border-black py-2 flex justify-between items-center font-sans text-sm font-bold uppercase tracking-widest">
                    <span>{today}</span>
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                            <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
                        </svg>
                        <span>Kingdom Edition</span>
                    </div>
                    <span>Price: Paid in Full</span>
                </div>
            </div>
        </header>
    );
}
