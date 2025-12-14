import { Button } from "@/components/ui/button";
import { Church, CheckCircle2, Users, BookOpen, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Intro Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-primary/10 rounded-3xl -z-10 transform -rotate-3"></div>
                        <div className="relative h-[500px] bg-neutral-100 rounded-2xl overflow-hidden shadow-2xl border border-border">
                            <img 
                                src="/assets/church-building.jpg" 
                                alt="Santa Cruz Bible Christian Church Building"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl border border-border max-w-xs hidden md:block">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">69+</div>
                                <div>
                                    <p className="font-bold text-foreground">Years of Service</p>
                                    <p className="text-sm text-muted-foreground">Serving Santa Cruz since 1956</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <h4 className="text-primary font-bold tracking-wide uppercase text-sm mb-2">Who We Are</h4>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">A Community of Faith, Hope, and Love</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Founded in 1956, Santa Cruz Bible Christian Church has been a beacon of hope in our city for nearly seven decades. We started as a small bible study group and have grown into a vibrant family of believers dedicated to living out the Gospel.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 bg-primary/10 p-2 rounded-full text-primary">
                                    <CheckCircle2 size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Our Mission</h3>
                                    <p className="text-muted-foreground">To know Christ and make Him known through worship, discipleship, and service.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="mt-1 bg-primary/10 p-2 rounded-full text-primary">
                                    <CheckCircle2 size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Our Vision</h3>
                                    <p className="text-muted-foreground">To see our city transformed by the love and power of the Gospel, one life at a time.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button asChild size="lg" className="rounded-full px-8 shadow-lg hover:shadow-primary/25">
                                <a href="#contact">Plan a Visit</a>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Statement of Faith & Leadership */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Statement of Faith */}
                    <div className="bg-secondary/20 p-8 rounded-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="w-8 h-8 text-primary" />
                            <h3 className="text-2xl font-bold font-serif">Statement of Faith</h3>
                        </div>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                                We believe in the Holy Scriptures as the inspired and authoritative Word of God.
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                                We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                                We believe in the deity of our Lord Jesus Christ, His virgin birth, His sinless life, His miracles, His vicarious and atoning death, His bodily resurrection, and His ascension.
                            </li>
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                                We believe in the spiritual unity of believers in our Lord Jesus Christ.
                            </li>
                        </ul>
                    </div>

                    {/* Leadership Team */}
                    <div className="bg-secondary/20 p-8 rounded-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="w-8 h-8 text-primary" />
                            <h3 className="text-2xl font-bold font-serif">Leadership Team</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                                    <Heart className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Rev. John Doe</h4>
                                    <p className="text-primary font-medium">Senior Pastor</p>
                                    <p className="text-sm text-muted-foreground">Serving since 2010</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                                    <Users className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">Jane Smith</h4>
                                    <p className="text-primary font-medium">Associate Pastor</p>
                                    <p className="text-sm text-muted-foreground">Leading Youth & Outreach</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
