/**
 * ClassifiedFiller
 *
 * The decorative newspaper "classified ad" filler block that appears
 * at the bottom of the side column, styled as a rotated boxed ad.
 */
export default function ClassifiedFiller() {
    return (
        <div className="border-4 border-double border-neutral-400 p-6 text-center mt-8 opacity-70 lg:rotate-1">
            <p className="font-sans text-xs font-bold uppercase mb-2">Advertisement</p>
            <h4 className="font-black text-xl uppercase mb-2">Join a Small Group</h4>
            <p className="font-serif italic text-sm mb-4">"Life is better together."</p>
            <div className="inline-block border border-black px-4 py-1 font-sans text-xs font-bold uppercase">
                Call Now
            </div>
        </div>
    );
}
