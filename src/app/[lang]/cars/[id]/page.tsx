"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Car, Calendar, Settings, Gauge, Fuel, ChevronLeft, ChevronRight, Share2, Heart, MapPin, Phone, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: string;
  mileage: number;
  transmission: string;
  fuel: string;
  status: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
}

const WHATSAPP_NUMBER = "254707242805";

export default function CarDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/public/cars/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        router.back();
      });
  }, [params.id, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  if (!car) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-20 text-center">
          <Car className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Vehicle not found</p>
          <Button onClick={() => router.push("/cars")} className="mt-4">
            Back to Inventory
          </Button>
        </div>
      </main>
    );
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(price));
  };

  const openWhatsApp = () => {
    const message = `Hi Motor Hut, I'm interested in the ${car.year} ${car.make} ${car.model} (${car.id}). Price: ${formatPrice(car.price)}. Can you share more details and photos?`;
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
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Badge variant="secondary" className={cn(
              "text-sm",
              car.status === "available" && "bg-green-500/20 text-green-400",
              car.status === "sold" && "bg-red-500/20 text-red-400",
              car.status === "reserved" && "bg-yellow-500/20 text-yellow-400"
            )}>
              {car.status.toUpperCase()}
            </Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
                {car.imageUrl ? (
                  <img
                    src={car.imageUrl}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="w-32 h-32 text-primary/30" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">{car.year}</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">{car.make} {car.model}</h1>
                </div>
                <p className="text-3xl font-bold text-primary">{formatPrice(car.price)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border/50">
                  <Calendar className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Year</p>
                    <p className="font-semibold text-foreground">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border/50">
                  <Settings className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Transmission</p>
                    <p className="font-semibold text-foreground">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border/50">
                  <Gauge className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Mileage</p>
                    <p className="font-semibold text-foreground">{car.mileage.toLocaleString()} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border/50">
                  <Fuel className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Fuel Type</p>
                    <p className="font-semibold text-foreground">{car.fuel}</p>
                  </div>
                </div>
              </div>

              {car.description && (
                <div className="pt-4 border-t border-border/50">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{car.description}</p>
                </div>
              )}

              <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1 h-14 bg-primary text-primary-foreground hover:bg-primary/90" onClick={openWhatsApp}>
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Inquire on WhatsApp
                </Button>
                <Button size="lg" variant="outline" className="flex-1 h-14">
                  <Heart className="w-5 h-5 mr-2" />
                  Save Vehicle
                </Button>
              </div>

              <div className="pt-4 border-t border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Dealer</h3>
                <div className="grid grid-cols-3 gap-4">
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-background rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Argwings Kodhek Rd, Nairobi</span>
                  </a>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-background rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">+254 707 242 805</span>
                  </a>
                  <a href="mailto:motorhutltd@gmail.com" className="flex items-center gap-2 p-3 bg-background rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">motorhutltd@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
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