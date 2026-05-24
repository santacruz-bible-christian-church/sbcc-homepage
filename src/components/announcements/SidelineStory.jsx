import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { formatRelativeTime, formatFullDate } from "@/hooks";

/**
 * SidelineStory
 *
 * A single "In Other News" side-column announcement card.
 * Renders the headline, truncated body, relative date, ministry tag,
 * and an inline read-more dialog.
 */
export default function SidelineStory({ story }) {
    return (
        <div className="group cursor-pointer">
            {/* Meta Row */}
            <div className="mb-2 font-sans text-[10px] font-bold uppercase text-neutral-500 flex justify-between">
                <span>{formatRelativeTime(story.publish_at)}</span>
                {story.ministry_name && (
                    <span className="bg-black text-white px-1">{story.ministry_name}</span>
                )}
            </div>

            {/* Headline */}
            <h4 className="text-2xl font-bold leading-tight mb-3 group-hover:underline decoration-2 underline-offset-2">
                {story.title}
            </h4>

            {/* Truncated Body */}
            <p className="text-sm leading-snug text-neutral-600 line-clamp-3 mb-3 border-l-2 border-neutral-300 pl-3">
                {story.body}
            </p>

            {/* Read Dialog */}
            <Dialog>
                <DialogTrigger asChild>
                    <button className="font-sans text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white px-2 py-1 transition-colors border border-black">
                        Read
                    </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-[#f4f1ea] border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-0 overflow-hidden">
                    {story.photo && (
                        <div className="relative h-48 w-full border-b-2 border-black overflow-hidden">
                            <img
                                src={story.photo}
                                alt={story.title}
                                className="w-full h-full object-cover grayscale contrast-125"
                            />
                            <div className="absolute inset-0 bg-[radial-gradient(circle,theme('colors.neutral.900')_1px,transparent_1px)] bg-[length:4px_4px] opacity-20 pointer-events-none" />
                        </div>
                    )}
                    <div className="p-6 md:p-8">
                        <div className="mb-4 flex flex-wrap gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-500 border-b border-neutral-300 pb-4">
                            <span>{formatFullDate(story.publish_at)}</span>
                            {story.ministry_name && (
                                <>
                                    <span>•</span>
                                    <span className="text-black">{story.ministry_name}</span>
                                </>
                            )}
                        </div>
                        <h2 className="text-3xl font-serif font-black mb-6 leading-none uppercase">
                            {story.title}
                        </h2>
                        <p className="font-serif text-lg leading-relaxed whitespace-pre-line text-neutral-800">
                            {story.body}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="w-full h-px bg-neutral-300 mt-8" />
        </div>
    );
}
