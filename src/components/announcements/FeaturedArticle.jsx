import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { formatFullDate } from "@/hooks";

/**
 * FeaturedArticle
 *
 * The hero-column featured announcement for the Announcements page.
 * Renders the photo, body excerpt (drop-cap style), share button,
 * and a "Read Full Article" dialog.
 */
export default function FeaturedArticle({ announcement }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: announcement?.title || "SBCC Announcements",
            text: `Check out this announcement from SBCC: ${announcement?.title}`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log("Error sharing:", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareData.url);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy text: ", err);
            }
        }
    };

    if (!announcement) return null;

    const readTime = Math.ceil(announcement.body.split(" ").length / 200);

    return (
        <article className="border-b-2 border-neutral-300 pb-12">
            {/* Article Meta Row */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4 font-sans text-xs font-bold uppercase tracking-tight text-neutral-500 border-b border-black pb-2">
                <div className="flex items-center gap-2">
                    <span>{formatFullDate(announcement.publish_at)}</span>
                    {announcement.ministry_name && (
                        <>
                            <span>•</span>
                            <span className="text-neutral-900 bg-neutral-200 px-1">
                                {announcement.ministry_name}
                            </span>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <span>{readTime} min read</span>
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-1 hover:text-black transition-colors"
                    >
                        {isCopied
                            ? <Check className="w-3 h-3 text-green-600" />
                            : <Share2 className="w-3 h-3" />}
                        {isCopied
                            ? <span className="text-green-600 font-bold">Copied!</span>
                            : "Social"}
                    </button>
                </div>
            </div>

            {/* Headline */}
            <h2 className="text-5xl md:text-6xl font-bold leading-[0.9] mb-6 hover:underline decoration-4 underline-offset-4 cursor-pointer">
                {announcement.title}
            </h2>

            {/* Photo with halftone overlay */}
            <div className="mb-8 border-2 border-black p-1 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="grayscale contrast-125 hover:grayscale-0 transition-all duration-500 overflow-hidden relative">
                    <img
                        src={announcement.photo}
                        alt={announcement.title}
                        className="w-full h-auto object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle,theme('colors.neutral.900')_1px,transparent_1px)] bg-[length:4px_4px] opacity-20 pointer-events-none" />
                </div>
                <div className="flex justify-between items-center mt-2 px-1">
                    <div className="h-px bg-neutral-300 flex-grow mr-4" />
                    <p className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 whitespace-nowrap">
                        Fig 1.1 — Photo courtesy of Media Team
                    </p>
                </div>
            </div>

            {/* Body Excerpt — Drop-cap first 3 words */}
            <div className="text-neutral-900 text-lg leading-relaxed text-justify hyphens-auto font-serif">
                {announcement.body
                    .split("\n")
                    .filter(Boolean)
                    .slice(0, 1)
                    .map((paragraph, index) => (
                        <p key={index} className="mb-4">
                            <span className="font-bold uppercase tracking-widest text-sm mr-1 font-sans">
                                {paragraph.split(" ").slice(0, 3).join(" ")}
                            </span>
                            <span className="text-xl">
                                {paragraph.split(" ").slice(3).join(" ")}
                                <span className="text-neutral-400">...</span>
                            </span>
                        </p>
                    ))}
            </div>

            {/* Read Full Article Dialog */}
            <Dialog>
                <DialogTrigger asChild>
                    <div className="mt-8 flex justify-center">
                        <Button
                            variant="outline"
                            className="font-sans font-bold uppercase tracking-widest text-xs border-2 border-black hover:bg-black hover:text-white rounded-none px-8 py-6 transition-all"
                        >
                            Read Full Article on Page 4
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f4f1ea] border-2 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                    <DialogHeader>
                        <DialogTitle className="text-4xl font-serif font-black uppercase mb-4 leading-none">
                            {announcement.title}
                        </DialogTitle>
                        <DialogDescription className="font-sans text-xs uppercase tracking-widest text-neutral-500 border-b border-neutral-300 pb-4 mb-4">
                            {formatFullDate(announcement.publish_at)}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="font-serif text-lg leading-relaxed space-y-4">
                        {announcement.photo && (
                            <img
                                src={announcement.photo}
                                className="w-full grayscale contrast-125 mb-6 border border-black"
                                alt="Detail"
                            />
                        )}
                        <p className="whitespace-pre-line">{announcement.body}</p>
                    </div>
                </DialogContent>
            </Dialog>
        </article>
    );
}
