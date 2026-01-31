import { useState } from "react";
import { X, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
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
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif">Submit Your Prayer Request</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                    {/* Anonymous Toggle */}
                    <div className="flex items-center justify-between py-3 border-b border-border">
                        <Label htmlFor="isAnonymous" className="font-medium cursor-pointer">Submit Anonymously</Label>
                        <Switch
                            id="isAnonymous"
                            checked={formData.isAnonymous}
                            onCheckedChange={handleAnonymousChange}
                        />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">
                            Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            placeholder="Brief title for your request"
                            required
                            className="h-11"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Name & Email */}
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity ${formData.isAnonymous ? 'opacity-40 pointer-events-none' : ''}`}>
                        <div className="space-y-2">
                            <Label htmlFor="requesterName">
                                Name {!formData.isAnonymous && <span className="text-red-500">*</span>}
                            </Label>
                            <Input
                                id="requesterName"
                                placeholder="Your Name"
                                className="h-11"
                                value={formData.requesterName}
                                onChange={handleChange}
                                disabled={formData.isAnonymous}
                                required={!formData.isAnonymous}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="requesterEmail">
                                Email <span className="text-muted-foreground font-normal text-xs">(Optional)</span>
                            </Label>
                            <Input
                                id="requesterEmail"
                                type="email"
                                placeholder="Your Email"
                                className="h-11"
                                value={formData.requesterEmail}
                                onChange={handleChange}
                                disabled={formData.isAnonymous}
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className={`space-y-2 transition-opacity ${formData.isAnonymous ? 'opacity-40 pointer-events-none' : ''}`}>
                        <Label htmlFor="requesterPhone">
                            Phone <span className="text-muted-foreground font-normal text-xs">(Optional)</span>
                        </Label>
                        <Input
                            id="requesterPhone"
                            type="tel"
                            placeholder="Your Phone"
                            className="h-11"
                            value={formData.requesterPhone}
                            onChange={handleChange}
                            disabled={formData.isAnonymous}
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label>
                            Category <span className="text-muted-foreground font-normal text-xs">(Optional)</span>
                        </Label>
                        <Select onValueChange={handleCategoryChange} value={formData.category}>
                            <SelectTrigger className="h-11">
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

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Your Prayer Request <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Share your prayer request here..."
                            required
                            rows={4}
                            className="resize-none"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 rounded-xl"
                        disabled={status === "submitting" || status === "success"}
                    >
                        {status === "submitting" ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                        ) : status === "success" ? (
                            <><CheckCircle2 className="mr-2 h-4 w-4" /> Request Sent!</>
                        ) : (
                            <><Send className="mr-2 h-4 w-4" /> Send Request</>
                        )}
                    </Button>

                    {/* Messages */}
                    {status === "success" && (
                        <div className="p-4 bg-green-50 text-green-700 rounded-xl text-center text-sm font-medium border border-green-200">
                            Your prayer request has been received. We will be praying for you!
                        </div>
                    )}
                    {status === "error" && errorMessage && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-xl text-center text-sm font-medium border border-red-200 flex items-center justify-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            {errorMessage}
                        </div>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
