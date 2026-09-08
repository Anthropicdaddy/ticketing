import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Shield, CreditCard, Wrench, ArrowRight, ChevronRight, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Car,
    title: "Premium Selection",
    description: "Curated collection of luxury vehicles, SUVs, and trucks from top brands",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Every vehicle undergoes comprehensive inspection and comes with detailed history",
  },
  {
    icon: CreditCard,
    title: "Flexible Financing",
    description: "Competitive rates and flexible terms through our financing partners",
  },
  {
    icon: Wrench,
    title: "After-Sales Support",
    description: "Ongoing maintenance, warranty options, and dedicated customer care",
  },
];

const featuredCars = [
  { make: "Toyota", model: "Land Cruiser", year: 2023, price: "8500000", mileage: 15000, transmission: "Automatic", fuel: "Diesel" },
  { make: "Mercedes-Benz", model: "E-Class", year: 2022, price: "6800000", mileage: 25000, transmission: "Automatic", fuel: "Petrol" },
  { make: "BMW", model: "X5", year: 2023, price: "7200000", mileage: 12000, transmission: "Automatic", fuel: "Hybrid" },
];

const formatPrice = (price: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(price));
};

const WHATSAPP_NUMBER = "254707242805";

export default function HomePage() {
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
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground">Premium Automotive Excellence</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                Drive Your
                <br />
                <span className="text-primary">Dream</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
                Discover an exclusive collection of premium vehicles meticulously curated for discerning drivers. Experience luxury, performance, and unparalleled service.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/cars">
                  <Button size="lg" className="h-14 px-8 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                    Explore Inventory
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-14 px-8 text-base font-medium rounded-full" onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}>
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact on WhatsApp
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car className="w-48 h-48 text-primary/30" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-3 block">Why Choose Motor Hut</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Experience the Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="border-0 bg-card shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="inventory" className="py-20 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Featured Vehicles
              </h2>
              <p className="text-muted-foreground mt-1">Hand-picked from our premium collection</p>
            </div>
            <Link href="/cars">
              <Button variant="outline" className="gap-2">
                View All Inventory
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <Link key={`${car.make}-${car.model}-${car.year}`} href={`/cars/demo-${car.make}-${car.model}-${car.year}`}>
                <Card className="border-0 bg-card shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden group">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Car className="w-20 h-20 text-primary/30 group-hover:text-primary/50 transition-colors duration-300" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 text-xs font-semibold bg-green-500/20 text-green-400 rounded-full">
                        Available
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                        {car.make} {car.model}
                      </h3>
                    </div>

                    <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 text-primary/40 flex-shrink-0">📅</span>
                        <span>{car.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 text-primary/40 flex-shrink-0">⚙️</span>
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 text-primary/40 flex-shrink-0">📊</span>
                        <span>{car.mileage.toLocaleString()} km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 text-primary/40 flex-shrink-0">⛽</span>
                        <span>{car.fuel}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Price</span>
                        <p className="text-lg font-bold text-foreground">{formatPrice(car.price)}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/cars">
              <Button size="lg" variant="outline" className="gap-2">
                View All Inventory
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden gradient-gold p-12 md:p-16 text-center">
            <div className="absolute inset-0 opacity-10">
              <svg className="absolute top-4 left-8 w-20 h-20 text-white" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 5C50 5 20 25 20 50C20 75 50 95 50 95C50 95 80 75 80 50C80 25 50 5 50 5Z" />
              </svg>
              <svg className="absolute bottom-4 right-8 w-16 h-16 text-white" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 5C50 5 20 25 20 50C20 75 50 95 50 95C50 95 80 75 80 50C80 25 50 5 50 5Z" />
              </svg>
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 tracking-tight">
                Ready to Find Your Perfect Vehicle?
              </h2>
              <p className="text-navy/80 mb-8 max-w-md mx-auto">
                Our team is ready to help you discover the car of your dreams. Browse our inventory or contact us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/cars">
                  <Button size="lg" className="h-14 px-8 text-base font-medium rounded-full bg-navy text-gold hover:bg-navy/90 shadow-lg">
                    Browse Inventory
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-14 px-8 text-base font-medium rounded-full border-navy text-navy hover:bg-navy/5" onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}>
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

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