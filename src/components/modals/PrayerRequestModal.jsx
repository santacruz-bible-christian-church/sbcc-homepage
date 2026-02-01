import { useState } from "react";
import { X, Send, CheckCircle2, Loader2, AlertCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/services/api";

export default function PrayerRequestModal({ open, onOpenChange }) {
    const [status, setStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        requesterName: "",
        requesterEmail: "",
        requesterPhone: "",
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
            category: "",
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
            setErrorMessage("Please provide your name or choose to submit anonymously.");
            return;
        }

        try {
            await api.submitPrayerRequest(formData);
            setStatus("success");
            setTimeout(() => {
                resetForm();
                onOpenChange(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to submit prayer request:", error);
            setStatus("error");
            const status = error?.status;
            const data = error?.data;
            const extractValidationMessage = () => {
                if (!data) return null;
                if (typeof data === 'string') return data;
                if (typeof data?.detail === 'string') return data.detail;
                if (typeof data?.message === 'string') return data.message;
                if (typeof data === 'object') {
                    const [firstKey] = Object.keys(data);
                    const value = data[firstKey];
                    if (Array.isArray(value) && value[0]) return `${firstKey}: ${value[0]}`;
                    if (typeof value === 'string') return `${firstKey}: ${value}`;
                }
                return null;
            };

            if (status === 429) {
                setErrorMessage("Too many requests right now. Please wait a moment and try again.");
            } else if (status === 400) {
                const validationMessage = extractValidationMessage();
                setErrorMessage(validationMessage ? `Please check your submission. ${validationMessage}` : "Please check your submission and try again.");
            } else {
                setErrorMessage("Failed to send request. Please try again.");
            }
        }
    };

    const handleOpenChange = (open) => {
        if (!open) {
            resetForm();
        }
        onOpenChange(open);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-[#f4f1ea] border-2 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-0 gap-0">
                {/* Airmail Header */}
                <div className="bg-repeat-x h-4 w-full" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #ef4444 0, #ef4444 10px, transparent 10px, transparent 20px, #3b82f6 20px, #3b82f6 30px, transparent 30px, transparent 40px)" }}></div>
                
                <div className="p-8 md:p-10 relative overflow-hidden">
                    {/* Background Texture (Subtle Noise) */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                    <DialogHeader className="mb-8 border-b-2 border-neutral-300 pb-6 relative z-10">
                         {/* Stamp Visual (Perforated) */}
                        <div className="absolute top-0 right-0 w-20 h-24 bg-white border-2 border-dashed border-red-800/40 shadow-sm flex flex-col items-center justify-center -rotate-6 p-1 group hover:rotate-0 transition-transform duration-500">
                             <div className="w-full h-full border border-red-800/20 flex items-center justify-center p-1">
                                <Heart className="fill-red-800 text-red-800 w-8 h-8 opacity-80" />
                             </div>
                             <span className="text-[8px] font-mono font-bold uppercase text-red-800 mt-1">Heaven Bound</span>
                        </div>

                        <DialogTitle className="text-5xl font-serif font-black uppercase tracking-tighter text-neutral-900 italic transform -skew-x-6">
                            Air Mail
                        </DialogTitle>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 mt-2 font-bold block ml-1">
                            To: The Prayer Team<br/>
                            Priority: <span className="text-red-600">Urgent</span>
                        </p>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6 font-mono relative z-10">
                        {/* Anonymous Toggle */}
                        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 border-dashed">
                            <Label htmlFor="isAnonymous" className="uppercase tracking-widest text-xs font-bold text-neutral-500 cursor-pointer hover:text-black transition-colors">
                                Send Anonymously
                            </Label>
                            <Switch
                                id="isAnonymous"
                                checked={formData.isAnonymous}
                                onCheckedChange={handleAnonymousChange}
                                className="data-[state=checked]:bg-black"
                            />
                        </div>

                        {/* Subject */}
                        <div className="space-y-1">
                            <Label htmlFor="title" className="uppercase tracking-widest text-[10px] font-bold text-neutral-400">
                                Subject
                            </Label>
                            <Input
                                id="title"
                                placeholder="What is this regarding?"
                                required
                                className="h-auto py-2 bg-transparent border-0 border-b-2 border-neutral-300 rounded-none px-0 text-xl font-serif italic text-neutral-900 focus-visible:ring-0 focus-visible:border-black placeholder:text-neutral-300 transition-colors"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Name & Email Row */}
                        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-300 ${formData.isAnonymous ? 'opacity-30 blur-[1px] pointer-events-none' : 'opacity-100'}`}>
                            <div className="space-y-1">
                                <Label htmlFor="requesterName" className="uppercase tracking-widest text-[10px] font-bold text-neutral-400">
                                    From (Name)
                                </Label>
                                <Input
                                    id="requesterName"
                                    placeholder="Your Name"
                                    className="h-auto py-2 bg-transparent border-0 border-b-2 border-neutral-300 rounded-none px-0 text-base font-mono text-neutral-900 focus-visible:ring-0 focus-visible:border-black placeholder:text-neutral-300"
                                    value={formData.requesterName}
                                    onChange={handleChange}
                                    disabled={formData.isAnonymous}
                                    required={!formData.isAnonymous}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="requesterEmail" className="uppercase tracking-widest text-[10px] font-bold text-neutral-400">
                                    Return Address
                                </Label>
                                <Input
                                    id="requesterEmail"
                                    type="email"
                                    placeholder="email@example.com"
                                    className="h-auto py-2 bg-transparent border-0 border-b-2 border-neutral-300 rounded-none px-0 text-base font-mono text-neutral-900 focus-visible:ring-0 focus-visible:border-black placeholder:text-neutral-300"
                                    value={formData.requesterEmail}
                                    onChange={handleChange}
                                    disabled={formData.isAnonymous}
                                />
                            </div>
                        </div>

                         {/* Phone & Topic Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                             <div className={`space-y-1 transition-all duration-300 ${formData.isAnonymous ? 'opacity-30 blur-[1px] pointer-events-none' : 'opacity-100'}`}>
                                <Label htmlFor="requesterPhone" className="uppercase tracking-widest text-[10px] font-bold text-neutral-400">
                                    Phone (Optional)
                                </Label>
                                <Input
                                    id="requesterPhone"
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    className="h-auto py-2 bg-transparent border-0 border-b-2 border-neutral-300 rounded-none px-0 text-base font-mono text-neutral-900 focus-visible:ring-0 focus-visible:border-black placeholder:text-neutral-300"
                                    value={formData.requesterPhone}
                                    onChange={handleChange}
                                    disabled={formData.isAnonymous}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="uppercase tracking-widest text-[10px] font-bold text-neutral-400">
                                    Topic
                                </Label>
                                <Select onValueChange={handleCategoryChange} value={formData.category}>
                                    <SelectTrigger className="h-auto py-2 bg-transparent border-0 border-b-2 border-neutral-300 rounded-none px-0 focus:ring-0 focus:border-black w-full text-left font-mono text-base text-neutral-900">
                                        <SelectValue placeholder="Select topic..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#f4f1ea] border-2 border-black rounded-none">
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
                        </div>

                        {/* Message Body */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="uppercase tracking-widest text-[10px] font-bold text-neutral-400">
                                Message
                            </Label>
                            <div className="relative pt-1 pl-8 border-l border-red-300/50">
                                {/* Lined Paper Effect */}
                                <Textarea
                                    id="description"
                                    placeholder="Dear God..."
                                    required
                                    rows={8}
                                    className="resize-none bg-[linear-gradient(transparent_1.9em,#94a3b8_2em)] bg-[length:100%_2em] leading-[2em] border-0 rounded-none px-0 focus-visible:ring-0 text-neutral-800 placeholder:text-neutral-400/50 -mt-1 font-serif text-lg"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full h-14 bg-red-800 hover:bg-red-900 text-red-50 rounded-full font-serif font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 mt-4"
                            disabled={status === "submitting" || status === "success"}
                        >
                            {status === "submitting" ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sealing...</>
                            ) : status === "success" ? (
                                <><CheckCircle2 className="mr-2 h-4 w-4" /> Delivered</>
                            ) : (
                                <>
                                    <div className="w-8 h-8 rounded-full border-2 border-red-200/30 flex items-center justify-center text-xs">†</div>
                                    Seal & Send
                                </>
                            )}
                        </Button>

                        {/* Messages */}
                        {status === "success" && (
                            <div className="p-4 bg-transparent border-2 border-dashed border-green-500 text-green-700 text-center text-xs font-mono uppercase tracking-widest">
                                Status: Received by Prayer Team
                            </div>
                        )}
                        {status === "error" && errorMessage && (
                            <div className="p-4 bg-transparent border-2 border-dashed border-red-500 text-red-700 text-center text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                {errorMessage}
                            </div>
                        )}
                    </form>
                </div>
                 {/* Airmail Footer */}
                <div className="bg-repeat-x h-4 w-full" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #ef4444 0, #ef4444 10px, transparent 10px, transparent 20px, #3b82f6 20px, #3b82f6 30px, transparent 30px, transparent 40px)" }}></div>
            </DialogContent>
        </Dialog>
    );
}
