import { ShoppingBasket, CreditCard, Package } from "lucide-react"

const steps = [
  {
    icon: ShoppingBasket,
    title: "Select Products",
    description: "Browse our wide range of grains, dals, oils, and essentials",
  },
  {
    icon: CreditCard,
    title: "Place Order",
    description: "Add items to cart and complete your order easily",
  },
  {
    icon: Package,
    title: "Get Delivery",
    description: "Receive your products at your doorstep quickly",
  },
]

export function HowItWorks() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-2">How It Works</h2>
          <p className="text-muted-foreground">Order your groceries in 3 simple steps</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center rounded-2xl bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </div>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
