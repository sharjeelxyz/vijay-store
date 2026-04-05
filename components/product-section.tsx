"use client"

import { useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useStore, categories } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

interface ProductSectionProps {
  category: string
  slug: string
}

export function ProductSection({ category, slug }: ProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { products } = useStore()

  const categoryProducts = products.filter((p) => p.category === category).slice(0, 6)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (categoryProducts.length === 0) return null

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">{category}</h2>
          <Link href={`/category/${slug}`}>
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              See All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="relative">
          {/* Left Scroll Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 rounded-full bg-card shadow-md sm:flex"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide sm:px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categoryProducts.map((product) => (
              <div key={product.id} className="w-[160px] flex-shrink-0 sm:w-[200px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 rounded-full bg-card shadow-md sm:flex"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
