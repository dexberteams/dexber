import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Check } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Portfolio Package",
    price: "1,500",
    currency: "SAR",
    description: "Perfect for freelancers and creatives showcasing their work.",
    features: [
      "Custom Homepage",
      "About & Contact Pages",
      "Portfolio Grid / Gallery",
      "Basic SEO Setup",
      "Mobile Responsive Design",
    ],
  },
  {
    name: "Coffee Shop Package",
    price: "2,500",
    currency: "SAR",
    description: "Ideal for cafes and restaurants to showcase their menu and location.",
    features: [
      "Digital Menu Integration",
      "Location & Opening Hours",
      "Social Media Links",
      "Contact & Reservation Form",
      "Mobile Responsive Design",
      "1 Month Free Support",
    ],
    popular: true,
  },
  {
    name: "Business Package",
    price: "3,500",
    currency: "SAR",
    description: "Comprehensive website for corporate and small businesses.",
    features: [
      "Up to 10 Pages",
      "Services Showcase",
      "Contact Form & Map",
      "Advanced SEO Optimization",
      "Blog Setup",
      "3 Months Free Support",
    ],
  },
  {
    name: "E-Commerce Package",
    price: "6,000",
    currency: "SAR",
    description: "Full online store setup with payment gateway integration.",
    features: [
      "Custom Store Design",
      "Product Catalog Setup",
      "Shopping Cart & Checkout",
      "Payment Gateway Integration",
      "Inventory Management",
      "6 Months Free Support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto">
          Choose the perfect package for your business. 50% advance payment required for all projects.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className={`relative flex flex-col ${plan.popular ? 'border-brand-blue ring-1 ring-brand-blue' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="mb-2">{plan.name}</CardTitle>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-muted-foreground/70">{plan.currency}</span>
              </div>
              <p className="text-sm text-muted-foreground/70 mt-2">{plan.description}</p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground/90">
                    <Check className="h-5 w-5 text-brand-blue shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/get-started?package=${encodeURIComponent(plan.name)}`} className="w-full">
                <Button variant={plan.popular ? "primary" : "outline"} className="w-full">
                  Select Package
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
