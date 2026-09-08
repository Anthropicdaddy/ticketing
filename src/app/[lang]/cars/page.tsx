"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Car, ChevronLeft, ChevronRight } from "lucide-react";
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

const makes = [
  "Toyota", "Mercedes-Benz", "BMW", "Honda", "Nissan", "Subaru", "Mazda", "Lexus",
  "Audi", "Volkswagen", "Ford", "Chevrolet", "Hyundai", "Kia", "Porsche", "Land Rover"
];

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const carsPerPage = 6;

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedMake) params.set("make", selectedMake);
    if (maxPrice) params.set("maxPrice", maxPrice);
    params.set("limit", String(carsPerPage * 2));

    fetch(`/api/public/cars?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setCars(data);
        setTotalPages(Math.ceil(data.length / carsPerPage));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedMake, maxPrice]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const paginatedCars = cars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(price));
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
            <Link href="/cars" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
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

      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Premium Automotive</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
            Drive Your
            <br />
            <span className="text-primary">Dream</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Discover an exclusive collection of premium vehicles meticulously curated for discerning drivers. Experience luxury, performance, and unparalleled service.
          </p>

          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="make" className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 block">
                  Make
                </label>
                <Select value={selectedMake} onValueChange={setSelectedMake}>
                  <SelectTrigger id="make" className="h-12 bg-background border-border/50">
                    <SelectValue placeholder="Any Make" />
                  </SelectTrigger>
                  <SelectContent>
                    {makes.map((make) => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="maxPrice" className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 block">
                  Max Price
                </label>
                <input
                  id="maxPrice"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="50,000"
                  className="w-full h-12 px-4 bg-background border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 block invisible">
                  Search
                </label>
                <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                  Search
                </Button>
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 block invisible">
                  Clear
                </label>
                <Button type="button" variant="outline" onClick={() => { setSelectedMake(null); setMaxPrice(""); setCurrentPage(1); }} className="w-full h-12">
                  Clear Filters
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section id="inventory" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Featured Vehicles
            </h2>
            <span className="text-sm text-muted-foreground">
              {cars.length} vehicles found
            </span>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border/50 animate-pulse">
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-8 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : paginatedCars.length === 0 ? (
            <div className="text-center py-20">
              <Car className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No vehicles found</p>
              <p className="text-sm text-muted-foreground/60 mt-2">Try adjusting your search filters or check back later</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCars.map((car) => (
                  <Link key={car.id} href={`/cars/${car.id}`}>
                    <article className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50">
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent overflow-hidden">
                        {car.imageUrl ? (
                          <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Car className="w-16 h-16 text-primary/30 group-hover:text-primary/50 transition-colors duration-300" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className={cn(
                            "text-[10px] font-semibold",
                            car.status === "available" && "bg-green-500/20 text-green-400",
                            car.status === "sold" && "bg-red-500/20 text-red-400",
                            car.status === "reserved" && "bg-yellow-500/20 text-yellow-400"
                          )}>
                            {car.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-5">
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
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
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