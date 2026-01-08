import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

export default function Contact() {
    const { settings } = useSettings();

    // Parse address for display (handles newlines)
    const formatMultiline = (text) => {
        if (!text) return null;
        const lines = text.split('\n').filter(line => line.trim());
        return lines.map((line, i) => (
            <span key={i}>
                {line.trim()}
                {i < lines.length - 1 && <br />}
            </span>
        ));
    };

    return (
        <section id="contact" className="py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We'd love to hear from you. Visit us this Sunday or reach out online.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                                    <MapPin className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                                    <p className="text-muted-foreground text-lg mb-2">
                                        {formatMultiline(settings.address) || '440 Frederick St, Santa Cruz, CA 95062'}
                                    </p>
                                    <Button variant="link" className="p-0 h-auto text-primary" asChild>
                                        <a href={`https://maps.google.com/?q=${encodeURIComponent(settings.address?.replace(/\n/g, ', ') || '')}`} target="_blank" rel="noopener noreferrer">Get Directions &rarr;</a>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                                    <Clock className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Service Times</h3>
                                    <div className="text-muted-foreground text-lg">
                                        {formatMultiline(settings.service_schedule) || 'Sunday Worship: 9:00 AM - 11:00 AM'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold mb-1">Call Us</h3>
                                <p className="text-muted-foreground">{settings.phone || '(+63) 917-222-2222'}</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold mb-1">Email Us</h3>
                                <p className="text-muted-foreground">{settings.email || '1992.sbcc@gmail.com'}</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                            <div className="flex gap-4">
                                {settings.facebook_url && (
                                    <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-border/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-foreground">
                                        <Facebook size={22} />
                                    </a>
                                )}
                                {settings.instagram_url && (
                                    <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-border/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-foreground">
                                        <Instagram size={22} />
                                    </a>
                                )}
                                {settings.youtube_url && (
                                    <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-border/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-foreground">
                                        <Youtube size={22} />
                                    </a>
                                )}
                                {/* Show placeholder icons if no social URLs configured */}
                                {!settings.facebook_url && !settings.instagram_url && !settings.youtube_url && (
                                    <>
                                        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-border/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-foreground">
                                            <Facebook size={22} />
                                        </a>
                                        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-border/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-foreground">
                                            <Instagram size={22} />
                                        </a>
                                        <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-border/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-foreground">
                                            <Youtube size={22} />
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="h-[500px] lg:h-auto bg-muted rounded-2xl overflow-hidden shadow-lg border border-border relative">
                        <iframe
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.church_name || 'Santa Cruz Bible Christian Church, Santa Cruz, Philippines')}&output=embed`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Church Location"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
