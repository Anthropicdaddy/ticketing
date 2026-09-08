import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Shield, CreditCard, Truck, Wrench, Key, Car } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Select Your Vehicle",
    description: "Browse our selection and connect with a sales representative via our website, WhatsApp, hotline, or visit us in person.",
    icon: Car,
  },
  {
    number: 2,
    title: "Book an Inspection",
    description: "Schedule an in-yard inspection to ensure the vehicle meets your standards and requirements.",
    icon: Calendar,
  },
  {
    number: 3,
    title: "Verification",
    description: "Verify the vehicle details before proceeding.",
    items: [
      "Check the vehicle's mileage",
      "Verify logbook details",
      "Confirm the seller's bank details"
    ],
    icon: Shield,
  },
  {
    number: 4,
    title: "Quotation",
    description: "Request a proforma invoice from our sales team.",
    icon: CreditCard,
  },
  {
    number: 5,
    title: "Confirmation",
    description: "Finalize the payment transfer and share the transfer confirmation with us.",
    items: [
      "Finalize sales agreements",
      "Complete the ownership transfer through your active NTSA TIMS account",
      "Receive the original logbook from the seller",
      "Prepare the vehicle, ensuring all necessary accessories and tools are in order",
      "Complete a car wash and detailing",
      "Hand over the vehicle to you, the proud new owner"
    ],
    icon: Key,
  },
  {
    number: 6,
    title: "Documentation & Release",
    description: "Complete the ownership transfer and receive your vehicle.",
    items: [
      "Prepare the vehicle, ensuring all necessary accessories and tools are in order",
      "Complete a car wash and detailing",
      "Hand over the vehicle to you, the proud new owner"
    ],
    icon: Truck,
  },
];

const financeSteps = [
  {
    number: 1,
    title: "Check Eligibility",
    description: "Confirm eligibility with your preferred financiers, whether it's a bank, SACCO, or microfinance institution. Our sales agents are available to assist.",
    icon: Shield,
  },
  {
    number: 2,
    title: "Submit Documents",
    description: "Provide all necessary documents to your chosen financier and obtain confirmation of your finance eligibility.",
    icon: CreditCard,
  },
  {
    number: 3,
    title: "Vehicle Reservation",
    description: "Reserve your vehicle with a down payment.",
    icon: Calendar,
  },
  {
    number: 4,
    title: "Finance Approval",
    description: "Work with your financier to get approval for your loan.",
    icon: Shield,
  },
  {
    number: 5,
    title: "Undertaking / Release Letter",
    description: "Complete the final steps for vehicle release.",
    items: [
      "Complete your portion of the payment",
      "The seller will finalize the ownership transfer and submit any remaining documents"
    ],
    icon: Key,
  },
];

const documents = [
  "National ID / Company Registration",
  "KRA PIN Certificate",
  "Contact Number",
  "Email ID",
  "Active NTSA TIMS Account",
];

const financeDocuments = [
  "Bank Statements (Last 6 months)",
  "Mpesa Statements (Last 6 months)",
  "Employment / Business Confirmation Documents",
  "Salary Slips (Last 6 months)",
  "National ID / Company Registration",
  "KRA PIN Certificate",
  "Contact Number",
  "Email ID",
  "Active NTSA TIMS Account",
];

export default function ServicesPage() {
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
            <Link href="/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
            How to Purchase Your Vehicle
          </h1>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
              Necessary Details and Documents
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Before you start, ensure you have the following ready:
            </p>
            <ul className="grid md:grid-cols-2 gap-4">
              {documents.map((doc, i) => (
                <li key={i} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/50">
                  <span className="text-2xl">📄</span>
                  <span className="text-foreground">{doc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
              Purchase Process
            </h2>
            <div className="space-y-6">
              {steps.map((step) => (
                <Card key={step.number} className="border-border/50 bg-card/50 overflow-hidden">
                  <CardContent className="p-6 flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                      {step.items && (
                        <ul className="mt-3 space-y-2">
                          {step.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
              Asset Finance
            </h2>
            <h3 className="text-xl font-semibold text-center text-foreground mb-4">
              Necessary Details and Documents
            </h3>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              To apply for asset finance, have these documents ready:
            </p>
            <ul className="grid md:grid-cols-3 gap-4 mb-12">
              {financeDocuments.map((doc, i) => (
                <li key={i} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/50">
                  <span className="text-2xl">📄</span>
                  <span className="text-foreground">{doc}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-center text-foreground mb-8">
              Eligibility and Approval Process
            </h3>
            <div className="space-y-6">
              {financeSteps.map((step) => (
                <Card key={step.number} className="border-border/50 bg-card/50 overflow-hidden">
                  <CardContent className="p-6 flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                      {step.items && (
                        <ul className="mt-3 space-y-2">
                          {step.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="text-center py-12 bg-card/50 rounded-2xl border border-border/50">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Start Your Purchase Journey
                <span>→</span>
              </Button>
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