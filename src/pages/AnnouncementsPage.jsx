import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import { useAnnouncements, useScrollToTop } from "@/hooks";
import NewsMasthead from "@/components/announcements/NewsMasthead";
import FeaturedArticle from "@/components/announcements/FeaturedArticle";
import SidelineStory from "@/components/announcements/SidelineStory";
import ClassifiedFiller from "@/components/announcements/ClassifiedFiller";

const sideColumnVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const storyVariant = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
};

export default function AnnouncementsPage() {
    useScrollToTop();
    const {
        announcements,
        loading,
        error,
        featuredAnnouncement,
        restAnnouncements,
    } = useAnnouncements({ limit: 20 });

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <PageWrapper className="min-h-screen bg-[#f4f1ea] font-serif text-neutral-900 selection:bg-neutral-900 selection:text-[#f4f1ea]">
            <Navbar />

            {/* MASTHEAD */}
            <NewsMasthead today={today} />

            {/* CONTENT: Newspaper Grid */}
            <section className="py-12 px-6">
                <div className="container mx-auto max-w-6xl">

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4" />
                            <p className="font-mono text-xs uppercase tracking-widest">
                                Fetching latest news...
                            </p>
                        </div>
                    )}

                    {/* Error State */}
                    {!loading && error && (
                        <div className="text-center py-20 border-2 border-black p-12 max-w-lg mx-auto bg-white lg:rotate-1">
                            <h3 className="text-2xl font-bold mb-2 uppercase">Printing Error</h3>
                            <p className="font-sans text-sm">
                                {error?.status === 429
                                    ? "Please wait a moment."
                                    : "Check connection."}
                            </p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && announcements.length === 0 && (
                        <div className="text-center py-20">
                            <h3 className="text-4xl font-bold uppercase mb-4">Extra! Extra!</h3>
                            <p className="font-sans">No news is good news? Check back later.</p>
                        </div>
                    )}

                    {/* Main Newspaper Grid */}
                    {!loading && !error && announcements.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* MAIN COLUMN: Featured Article — 8 cols */}
                            <div className="lg:col-span-8 flex flex-col gap-12">
                                <FeaturedArticle announcement={featuredAnnouncement} />
                            </div>

                            {/* SIDE COLUMN: In Other News — 4 cols */}
                            <motion.div
                                className="lg:col-span-4 border-t-2 lg:border-t-0 lg:border-l-2 border-black pt-8 lg:pt-0 lg:pl-8 lg:ml-4 flex flex-col gap-8"
                                variants={sideColumnVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                            >
                                <motion.h3
                                    variants={storyVariant}
                                    className="font-sans font-black text-xl uppercase border-b-4 border-black pb-2"
                                >
                                    In Other News
                                </motion.h3>

                                {restAnnouncements.map((story) => (
                                    <motion.div key={story.id} variants={storyVariant}>
                                        <SidelineStory story={story} />
                                    </motion.div>
                                ))}

                                <motion.div variants={storyVariant}>
                                    <ClassifiedFiller />
                                </motion.div>
                            </motion.div>

                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </PageWrapper>
    );
}
