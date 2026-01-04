import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { api } from "@/services/api";

export default function PrayerRequest() {
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        requesterName: "",
        requesterEmail: "",
        category: "",
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
        setFormData(prev => ({ ...prev, isAnonymous: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        // Validate: if not anonymous, name is required
        if (!formData.isAnonymous && !formData.requesterName.trim()) {
            setStatus("error");
            setErrorMessage("Please provide your name or choose to submit anonymously.");
            return;
        }

        try {
            await api.submitPrayerRequest(formData);
            setStatus("success");
            setFormData({
                title: "",
                requesterName: "",
                requesterEmail: "",
                category: "",
                description: "",
                isAnonymous: false
            });
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error("Failed to submit prayer request:", error);
            setStatus("error");
            setErrorMessage("Failed to send request. Please try again.");
        }
    };

    return (
        <section id="prayer" className="py-24 bg-gradient-to-b from-white to-secondary/20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">Prayer Request</h2>
                        <blockquote className="text-xl md:text-2xl font-serif italic text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                            "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
                            <footer className="text-sm font-sans font-semibold mt-4 not-italic text-primary">- Philippians 4:6</footer>
                        </blockquote>
                        <p className="text-lg text-foreground/80">We believe in the power of prayer. How can we pray for you today?</p>
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-border/50 relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            {/* Anonymous Toggle */}
                            <div className="flex items-center justify-end space-x-2">
                                <Switch
                                    id="isAnonymous"
                                    checked={formData.isAnonymous}
                                    onCheckedChange={handleAnonymousChange}
                                />
                                <Label htmlFor="isAnonymous" className="font-medium cursor-pointer">Submit Anonymously</Label>
                            </div>

                            {/* Title Field - Required */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-base font-medium">
                                    Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Brief title for your request"
                                    required
                                    className="h-12 bg-secondary/20 border-border/50 focus:bg-white transition-colors"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Name & Email - Conditional */}
                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ${formData.isAnonymous ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                <div className="space-y-2">
                                    <Label htmlFor="requesterName" className="text-base font-medium">
                                        Name {!formData.isAnonymous && <span className="text-red-500">*</span>}
                                    </Label>
                                    <Input
                                        id="requesterName"
                                        placeholder="Your Name"
                                        className="h-12 bg-secondary/20 border-border/50 focus:bg-white transition-colors"
                                        value={formData.requesterName}
                                        onChange={handleChange}
                                        disabled={formData.isAnonymous}
                                        required={!formData.isAnonymous}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="requesterEmail" className="text-base font-medium">
                                        Email <span className="text-muted-foreground font-normal">(Optional)</span>
                                    </Label>
                                    <Input
                                        id="requesterEmail"
                                        type="email"
                                        placeholder="Your Email"
                                        className="h-12 bg-secondary/20 border-border/50 focus:bg-white transition-colors"
                                        value={formData.requesterEmail}
                                        onChange={handleChange}
                                        disabled={formData.isAnonymous}
                                    />
                                </div>
                            </div>

                            {/* Category - Optional */}
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-base font-medium">
                                    Category <span className="text-muted-foreground font-normal">(Optional)</span>
                                </Label>
                                <Select onValueChange={handleCategoryChange} value={formData.category}>
                                    <SelectTrigger className="h-12 bg-secondary/20 border-border/50 focus:bg-white transition-colors">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="health">Health & Healing</SelectItem>
                                        <SelectItem value="family">Family</SelectItem>
                                        <SelectItem value="financial">Financial</SelectItem>
                                        <SelectItem value="spiritual">Spiritual Growth</SelectItem>
                                        <SelectItem value="relationships">Relationships</SelectItem>
                                        <SelectItem value="work">Work/Career</SelectItem>
                                        <SelectItem value="grief">Grief & Loss</SelectItem>
                                        <SelectItem value="thanksgiving">Thanksgiving</SelectItem>
                                        <SelectItem value="guidance">Guidance & Wisdom</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Description - Required */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-base font-medium">
                                    Prayer Request <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Share your prayer request here..."
                                    required
                                    rows={5}
                                    className="resize-none bg-secondary/20 border-border/50 focus:bg-white transition-colors p-4"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full text-lg py-6 rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300"
                                disabled={status === "submitting" || status === "success"}
                            >
                                {status === "submitting" ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                                    </>
                                ) : status === "success" ? (
                                    <>
                                        <CheckCircle2 className="mr-2 h-5 w-5" /> Request Sent
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-5 w-5" /> Send Request
                                    </>
                                )}
                            </Button>

                            {/* Success Message */}
                            {status === "success" && (
                                <div className="p-4 bg-green-50 text-green-700 rounded-xl text-center font-medium animate-in fade-in slide-in-from-bottom-2 border border-green-100">
                                    Your prayer request has been received. We will be praying for you!
                                </div>
                            )}

                            {/* Error Message */}
                            {status === "error" && errorMessage && (
                                <div className="p-4 bg-red-50 text-red-700 rounded-xl text-center font-medium animate-in fade-in slide-in-from-bottom-2 border border-red-100 flex items-center justify-center gap-2">
                                    <AlertCircle className="h-5 w-5" />
                                    {errorMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
