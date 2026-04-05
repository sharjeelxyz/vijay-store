import { Truck, BadgePercent, ShieldCheck } from "lucide-react";

const promos = [
  {
    icon: ShieldCheck,
    title: "Best Quality Grains",
    description: "Premium quality products sourced directly",
  },
  {
    icon: BadgePercent,
    title: "Affordable Prices",
    description: "Competitive prices for all products",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick delivery to your doorstep",
  },
];

export function PromoBanner() {
  return (
    <section className="py-12 bg-primary/5">
      <div className="container mx-auto px-4">
        {/* Heading (optional but looks premium) */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground">
            We provide quality products with best service
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
          {promos.map((promo, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center rounded-2xl bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <promo.icon className="h-8 w-8 text-primary" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {promo.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {promo.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
