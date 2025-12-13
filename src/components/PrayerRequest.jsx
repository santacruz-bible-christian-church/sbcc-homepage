import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
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
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        category: "",
        request: "",
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

        try {
            const response = await api.submitPrayerRequest(formData);
            if (response.success) {
                setStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    category: "",
                    request: "",
                    isAnonymous: false
                });
                setTimeout(() => setStatus("idle"), 5000);
            }
        } catch (error) {
            console.error("Failed to submit prayer request:", error);
            setStatus("idle"); // Or error state
            alert("Failed to send request. Please try again.");
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

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="flex items-center justify-end space-x-2">
                                <Switch
                                    id="isAnonymous"
                                    checked={formData.isAnonymous}
                                    onCheckedChange={handleAnonymousChange}
                                />
                                <Label htmlFor="isAnonymous" className="font-medium cursor-pointer">Submit Anonymously</Label>
                            </div>

                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-300 ${formData.isAnonymous ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-base font-medium">Name <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                                    <Input
                                        id="name"
                                        placeholder="Your Name"
                                        className="h-12 text-lg bg-secondary/20 border-border/50 focus:bg-white transition-colors"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={formData.isAnonymous}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="email" className="text-base font-medium">Email <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Your Email"
                                        className="h-12 text-lg bg-secondary/20 border-border/50 focus:bg-white transition-colors"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={formData.isAnonymous}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="category" className="text-base font-medium">Category <span className="text-red-500">*</span></Label>
                                <Select onValueChange={handleCategoryChange} value={formData.category} required>
                                    <SelectTrigger className="h-12 text-lg bg-secondary/20 border-border/50 focus:bg-white transition-colors">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Healing">Healing</SelectItem>
                                        <SelectItem value="Guidance">Guidance</SelectItem>
                                        <SelectItem value="Family">Family</SelectItem>
                                        <SelectItem value="Thanksgiving">Thanksgiving</SelectItem>
                                        <SelectItem value="Salvation">Salvation</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="request" className="text-base font-medium">Prayer Request <span className="text-red-500">*</span></Label>
                                <Textarea
                                    id="request"
                                    placeholder="Share your request here..."
                                    required
                                    rows={6}
                                    className="resize-none text-lg bg-secondary/20 border-border/50 focus:bg-white transition-colors p-4"
                                    value={formData.request}
                                    onChange={handleChange}
                                />
                            </div>

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

                            {status === "success" && (
                                <div className="p-4 bg-green-50 text-green-700 rounded-xl text-center font-medium animate-in fade-in slide-in-from-bottom-2 border border-green-100">
                                    Your prayer request has been received. We will be praying for you!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
