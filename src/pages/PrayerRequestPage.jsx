import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { api } from "@/services/api";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import PrayerDeskForm from "@/components/prayer/PrayerDeskForm";
import SealedEnvelope from "@/components/prayer/SealedEnvelope";

export default function PrayerRequestPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        requesterName: "",
        requesterEmail: "",
        requesterPhone: "",
        category: "other",
        description: "",
        isAnonymous: false
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCategoryChange = (value) => {
        setFormData(prev => ({ ...prev, category: value }));
    };

    const handleAnonymousChange = (checked) => {
        setFormData(prev => ({
            ...prev,
            isAnonymous: checked,
            ...(checked
                ? { requesterName: "", requesterEmail: "", requesterPhone: "" }
                : {})
        }));
    };

    const resetForm = () => {
        setFormData({
            title: "",
            requesterName: "",
            requesterEmail: "",
            requesterPhone: "",
            category: "other",
            description: "",
            isAnonymous: false
        });
        setStatus("idle");
        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        if (!formData.isAnonymous && !formData.requesterName.trim()) {
            setStatus("error");
            setErrorMessage("Please enter your name or choose to send anonymously.");
            return;
        }

        try {
            await api.submitPrayerRequest(formData);
            setStatus("success");
        } catch (error) {
            console.error("Prayer submission failed:", error);
            setStatus("error");
            const errStatus = error?.status;
            const errData = error?.data;

            const extractValidationMessage = () => {
                if (!errData) return null;
                if (typeof errData === 'string') return errData;
                if (typeof errData?.detail === 'string') return errData.detail;
                if (typeof errData?.message === 'string') return errData.message;
                return null;
            };

            if (errStatus === 429) {
                setErrorMessage("Too many submissions recently. Please wait a moment.");
            } else if (errStatus === 400) {
                const validationMsg = extractValidationMessage();
                setErrorMessage(validationMsg ? `Details: ${validationMsg}` : "Please verify your input fields.");
            } else {
                setErrorMessage("Unable to establish link with media database. Try again.");
            }
        }
    };

    return (
        <PageWrapper className="min-h-screen bg-[#f4f1ea] font-sans antialiased selection:bg-neutral-900 selection:text-[#f4f1ea] overflow-x-hidden">
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

            {/* CONTENT: Interactive Correspondence Writing Desk */}
            <section className="py-20 px-4 md:px-6">
                <div className="container mx-auto max-w-4xl">
                    
                    {/* The Leather Desk Blotter Mat */}
                    <div className="bg-[#4a3525] border-[6px] border-[#2c1e14] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 md:p-8 relative rounded-sm overflow-hidden">
                        {/* Wood Grain blotter borders overlay */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
                        
                        <AnimatePresence mode="wait">
                            {status !== "success" ? (
                                <PrayerDeskForm
                                    formData={formData}
                                    status={status}
                                    errorMessage={errorMessage}
                                    onChange={handleChange}
                                    onCategoryChange={handleCategoryChange}
                                    onAnonymousChange={handleAnonymousChange}
                                    onSubmit={handleSubmit}
                                />
                            ) : (
                                <SealedEnvelope 
                                    formData={formData}
                                    onReset={resetForm}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </section>

            <Footer />
        </PageWrapper>
    );
}
