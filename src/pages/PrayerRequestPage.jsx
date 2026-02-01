import { useState, useEffect } from "react";
import { Heart, Send, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PrayerRequestModal from "@/components/modals/PrayerRequestModal";

import PageWrapper from "@/components/layout/PageWrapper";

export default function PrayerRequestPage() {
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageWrapper className="min-h-screen bg-[#f4f1ea] font-sans antialiased selection:bg-neutral-900 selection:text-[#f4f1ea]">
            <Navbar />

            {/* HEADER: Stationery Branding */}
            <header className="pt-32 pb-12 px-6 text-center border-b border-neutral-300">
                <div className="container mx-auto max-w-2xl">
                    <div className="inline-block border-b-2 border-black pb-1 mb-6">
                        <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold">
                            Est. 1992 — The Correspondence
                        </span>
                    </div>
                    <h1 className="font-serif text-6xl md:text-8xl font-black tracking-tight mb-6 uppercase text-neutral-900">
                        Letters
                    </h1>
                    <p className="font-serif italic text-2xl text-neutral-600">
                        "To the Father"
                    </p>
                </div>
            </header>

            {/* CONTENT: The Letter */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-3xl">
                    <div className="bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black p-8 md:p-16 relative">
                        {/* Stamp/Mark */}
                        <div className="absolute top-8 right-8 w-24 h-24 border-2 border-neutral-300 rounded-full flex items-center justify-center opacity-50 rotate-12 hidden md:flex">
                            <span className="font-mono text-[10px] uppercase text-center leading-tight text-neutral-400">
                                Postage<br/>Paid By<br/>Christ
                            </span>
                        </div>

                        {/* Body Text */}
                        <div className="space-y-8 font-mono text-sm md:text-base leading-relaxed text-neutral-700">
                            <p>
                                <span className="font-bold text-black uppercase tracking-widest mr-2">Dear Family,</span>
                            </p>
                            <p>
                                Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.
                            </p>
                            <p>
                                There is something profound about writing it down—sealing your worries, your hopes, and your gratitude into a letter and sending it heavenward. Our team is here to read, to agree, and to lift these letters up with you.
                            </p>
                            <p>
                                You are not writing into the void. You are heard.
                            </p>
                            <div className="pt-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-t-2 border-neutral-100 mt-12">
                                <div>
                                    <p className="font-serif italic text-lg text-neutral-500 mb-1">With Love,</p>
                                    <p className="font-bold text-xl uppercase tracking-widest">The Prayer Team</p>
                                </div>
                                <Button 
                                    onClick={() => setModalOpen(true)}
                                    className="h-auto py-4 px-8 bg-black text-white hover:bg-neutral-800 rounded-none border-2 border-transparent hover:border-black transition-all font-mono uppercase tracking-widest text-xs font-bold flex items-center gap-2 shadow-none hover:translate-y-px"
                                >
                                    <PenTool className="w-4 h-4" />
                                    Write a Letter
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Prayer Request Modal */}
            <PrayerRequestModal open={modalOpen} onOpenChange={setModalOpen} />
        </PageWrapper>
    );
}
