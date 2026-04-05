"use client"

import { use, useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { StoreProvider, useStore, categories } from "@/lib/store-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingButtons } from "@/components/floating-buttons"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const categoryMap: Record<string, string> = {
  "rice": "Rice",
  "atta-flour": "Atta & Flour",
  "dals-pulses": "Dals & Pulses",
  "oil": "Oil",
  "masala": "Masala",
  "dry-fruits": "Dry Fruits",
  "packaged-items": "Packaged Items",
}

function CategoryContent({ slug }: { slug: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const { products } = useStore()

  const categoryName = categoryMap[slug] || "Products"

  const filteredProducts = useMemo(() => {
    const categoryProducts = products.filter((p) => p.category === categoryName)
    if (!searchQuery.trim()) return categoryProducts
    
    return categoryProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [products, categoryName, searchQuery])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{categoryName}</h1>
            <p className="mt-1 text-muted-foreground">
              {filteredProducts.length} products available
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Search in ${categoryName}...`}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Category Quick Links */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {categories.map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}`}>
                  <Button
                    variant={cat.slug === slug ? "default" : "outline"}
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    {cat.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">No products found</p>
              {searchQuery && (
                <Button
                  variant="link"
                  onClick={() => setSearchQuery("")}
                  className="mt-2"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  
  return (
    <StoreProvider>
      <CategoryContent slug={slug} />
    </StoreProvider>
  )
}
