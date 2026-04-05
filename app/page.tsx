"use client";

import { StoreProvider } from "@/lib/store-context";
import { Header } from "@/components/header";
import { CategoryCarousel } from "@/components/category-carousel";
import { PromoBanner } from "@/components/promo-banner";
import { ProductSection } from "@/components/product-section";
import { HowItWorks } from "@/components/how-it-works";
import { Footer } from "@/components/footer";
import { FloatingButtons } from "@/components/floating-buttons";

export default function HomePage() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                  Since 1973
                </span>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  <span className="text-balance">Quality Grains for</span>{" "}
                  <span className="text-primary">Your Kitchen</span>
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-lg text-pretty">
                  Premium rice, atta, dals, oils and daily essentials delivered
                  to your doorstep at the best prices.
                </p>
              </div>
            </div>
          </section>

          {/* Category Carousel */}
          <CategoryCarousel />

          {/* How It Works */}
          <HowItWorks />

          {/* Product Sections */}
          <ProductSection category="Rice" slug="rice" />
          <ProductSection category="Atta & Flour" slug="atta-flour" />
          <ProductSection category="Dals & Pulses" slug="dals-pulses" />

          {/* Promo Banner */}
          <PromoBanner />
        </main>

        <Footer />
        <FloatingButtons />
      </div>
    </StoreProvider>
  );
}
