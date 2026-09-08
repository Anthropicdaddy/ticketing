import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Shield, CreditCard, Wrench, Users, Star } from "lucide-react";

const features = [
  { icon: Car, title: "Wide Selection of Vehicles", description: "Explore our diverse inventory of new and pre-owned vehicles, including sedans, SUVs, trucks, and more. Find the perfect vehicle to suit your needs and budget." },
  { icon: Shield, title: "Certified Pre-Owned Vehicles", description: "Shop our selection of certified pre-owned vehicles, each rigorously inspected and backed by a comprehensive warranty for added peace of mind." },
  { icon: CreditCard, title: "Flexible Financing Options", description: "Our experienced finance team is here to help you find the best financing options for your budget. Get pre-approved for financing and drive home your dream car today." },
  { icon: Wrench, title: "Professional Car Care Services", description: "From routine maintenance to major repairs, our certified technicians use state-of-the-art equipment to keep your vehicle running smoothly." },
  { icon: Users, title: "Friendly Customer Service", description: "Our dedicated team is here to assist you every step of the way, from browsing to purchase and beyond." },
  { icon: Star, title: "Quality Assurance", description: "Every vehicle undergoes a comprehensive inspection to ensure it meets our high standards of quality and reliability." },
];

const services = [
  { icon: Car, title: "Wide Selection of Vehicles", description: "Explore our diverse inventory of new and pre-owned vehicles, including sedans, SUVs, trucks, and more. Find the perfect vehicle to suit your needs and budget." },
  { icon: Shield, title: "Certified Pre-Owned Vehicles", description: "Shop our selection of certified pre-owned vehicles, each rigorously inspected and backed by a comprehensive warranty for added peace of mind." },
  { icon: CreditCard, title: "Flexible Financing Options", description: "Our experienced finance team is here to help you find the best financing options for your budget. Get pre-approved for financing and drive home your dream car today." },
];

export default function AboutPage() {
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
            <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
            About Us
          </h1>

          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Experience the Freedom of the Open Road
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Experience the thrill of the open road with Motor Hut. Explore our diverse lineup of innovative vehicles, meticulously crafted for every adventure, big or small. Whether you crave the power and versatility of our SUVs, the sleek sophistication of our sedans, or the rugged dependability of our trucks, Motor Hut has the perfect driving companion to match your lifestyle.
            </p>
          </div>

          <section className="mb-16">
            <h3 className="text-xl font-semibold text-center text-primary mb-10">
              We offer:
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <Card key={i} className="border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-primary/10 rounded-xl">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-10">
              Our Services
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <Card key={i} className="border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mb-4 flex items-center justify-center bg-primary/10 rounded-xl">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="text-center py-12 bg-card/50 rounded-2xl border border-border/50">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Meet Our Team
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We're a team of passionate automotive enthusiasts dedicated to providing you with an exceptional car buying experience.
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
                Contact Us
                <span>→</span>
              </button>
            </Link>
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