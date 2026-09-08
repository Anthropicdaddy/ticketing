"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Globe, Clock, MessageSquare, Loader2, CreditCard } from "lucide-react";

const WHATSAPP_NUMBER = "254707242805";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Open WhatsApp with form data
    const message = `Hi Motor Hut, ${formData.name} (${formData.email}) wants to inquire about: ${formData.subject}. Message: ${formData.message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["Argwings Kodhek Rd", "Nairobi, Kenya"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+254 707 242 805"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["motorhutltd@gmail.com"],
    },
    {
      icon: Globe,
      title: "Website",
      details: ["motorhut.co.ke"],
    },
  ];

  const businessHours = [
    { day: "Mon - Sat", time: "08:00 - 18:00" },
    { day: "Sun", time: "10:00 - 16:00" },
  ];

  const openWhatsApp = (prefillMessage?: string) => {
    const message = prefillMessage || "Hi Motor Hut, I'd like to inquire about your vehicles.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-xl font-bold tracking-tight text-foreground">
              MOTOR <span className="text-primary">HUT</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/cars" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Inventory
            </Link>
            <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Get in touch with our team via WhatsApp for the fastest response.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-card rounded-xl border border-border/50">
                      <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        {item.details.map((detail, j) => (
                          <p key={j} className="text-sm text-muted-foreground">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-card rounded-xl border border-border/50">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Business Hours
                </h3>
                <ul className="space-y-3">
                  {businessHours.map((hour, i) => (
                    <li key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{hour.day}</span>
                      <span className="font-medium text-foreground">{hour.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-primary/10 border border-primary/20 rounded-xl">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Quick Contact via WhatsApp
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For immediate assistance, click below to chat with us directly on WhatsApp.
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => openWhatsApp("Hi Motor Hut, I'd like to inquire about your vehicles.")} className="flex-1">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    General Inquiry
                  </Button>
                  <Button onClick={() => openWhatsApp("Hi Motor Hut, I need help with financing for a vehicle.")} variant="outline" className="flex-1">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Financing Help
                  </Button>
                </div>
              </div>
            </div>

            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-foreground">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      disabled={status === "submitting"}
                      className="w-full h-11 px-4 bg-background border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      disabled={status === "submitting"}
                      className="w-full h-11 px-4 bg-background border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Vehicle inquiry / General question / etc."
                      required
                      disabled={status === "submitting"}
                      className="w-full h-11 px-4 bg-background border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                      required
                      disabled={status === "submitting"}
                      className="w-full min-h-[150px] px-4 bg-background border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(e);
                      // Also open WhatsApp with the form data
                      const message = `Hi Motor Hut, ${formData.name} (${formData.email}) wants to inquire about: ${formData.subject}. Message: ${formData.message}`;
                      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
                      window.open(url, '_blank');
                    }}
                    className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Send via WhatsApp
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <footer className="border-t border-border/50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">MOTOR <span className="text-primary">HUT</span></span>
            <span className="text-xs text-muted-foreground">© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </main>
  );
}