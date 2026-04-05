"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/store-context";

const categoryImages: Record<string, string> = {
  Rice: "🍚",
  "Atta & Flour": "🌾",
  "Dals & Pulses": "🫘",
  Oil: "🫒",
  Masala: "🌶️",
  "Dry Fruits": "🥜",
  "Packaged Items": "📦",
  Snacks: "🍪",
  Beverages: "🥤",
  "Personal Care": "🧴",
  Household: "🏠",
  "Baby Care": "👶",
  "Pet Care": "🐾",
  "Health & Wellness": "💊",
};

export function CategoryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto lg:w-6xl px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Shop by Category
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 items-center justify-start overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group flex-shrink-0"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 flex items-center justify-center">
                  <span className="text-4xl">
                    {categoryImages[category.name]}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground text-center whitespace-nowrap">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
