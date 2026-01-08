import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

export default function Contact() {
    const { settings } = useSettings();

    const socialLinks = [
        { icon: Facebook, href: settings.facebook_url, label: "Facebook" },
        { icon: Instagram, href: settings.instagram_url, label: "Instagram" },
        { icon: Youtube, href: settings.youtube_url, label: "YouTube" },
    ].filter(link => link.href);

    return (
        <section id="contact" className="py-24 md:py-32 bg-secondary">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-[2px] bg-primary/30" />
                        <span className="text-primary font-medium tracking-widest text-sm uppercase">
                            Get In Touch
                        </span>
                        <div className="w-12 h-[2px] bg-primary/30" />
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Contact Us
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                        We'd love to hear from you. Visit us this Sunday or reach out online.
                    </p>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Left: Contact Cards */}
                    <div className="space-y-4">
                        {/* Address Card */}
                        <div className="bg-white border border-border/50 rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold text-foreground mb-1">Visit Us</h3>
                                    <p className="text-muted-foreground mb-3">
                                        {settings.address || '440 Frederick St, Santa Cruz, CA 95062'}
                                    </p>
                                    <Button 
                                        variant="link" 
                                        className="p-0 h-auto text-primary font-medium" 
                                        asChild
                                    >
                                        <a 
                                            href={`https://maps.google.com/?q=${encodeURIComponent(settings.address?.replace(/\n/g, ', ') || settings.church_name || '')}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1"
                                        >
                                            <Navigation className="w-4 h-4" />
                                            Get Directions →
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Service Times Card */}
                        <div className="bg-white border border-border/50 rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">Service Times</h3>
                                    <p className="text-muted-foreground whitespace-pre-line">
                                        {settings.service_schedule || 'Sunday Worship: 9:00 AM - 11:00 AM'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Phone & Email Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a 
                                href={`tel:${settings.phone?.replace(/[^\d+]/g, '') || ''}`}
                                className="bg-white border border-border/50 rounded-2xl p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Phone className="w-5 h-5 text-primary group-hover:text-white" />
                                </div>
                                <h3 className="text-sm font-bold text-foreground mb-0.5">Call Us</h3>
                                <p className="text-muted-foreground text-sm">{settings.phone || '(+63) 917-222-2222'}</p>
                            </a>

                            <a 
                                href={`mailto:${settings.email || ''}`}
                                className="bg-white border border-border/50 rounded-2xl p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Mail className="w-5 h-5 text-primary group-hover:text-white" />
                                </div>
                                <h3 className="text-sm font-bold text-foreground mb-0.5">Email Us</h3>
                                <p className="text-muted-foreground text-sm truncate">{settings.email || '1992.sbcc@gmail.com'}</p>
                            </a>
                        </div>
                    </div>

                    {/* Right: Map */}
                    <div className="h-[400px] lg:h-auto min-h-[350px] bg-white border border-border/50 rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.church_name || 'Santa Cruz Bible Christian Church, Santa Cruz, Philippines')}&output=embed`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Church Location"
                            className="hover:scale-[1.02] transition-all duration-500"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
