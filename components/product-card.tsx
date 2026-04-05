"use client"

import { Plus } from "lucide-react"
import { useStore, Product } from "@/lib/store-context"
import { Button } from "@/components/ui/button"

const categoryEmojis: Record<string, string> = {
  "Rice": "🍚",
  "Atta & Flour": "🌾",
  "Dals & Pulses": "🫘",
  "Oil": "🫒",
  "Masala": "🌶️",
  "Dry Fruits": "🥜",
  "Packaged Items": "📦",
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, cart } = useStore()
  const cartItem = cart.find((item) => item.id === product.id)

  return (
    <div className="group flex flex-col rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-lg">
      <div className="relative mb-3 flex h-28 items-center justify-center rounded-lg bg-gradient-to-br from-muted to-muted/50">
        <span className="text-5xl">{categoryEmojis[product.category]}</span>
        {cartItem && (
          <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {cartItem.quantity}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{product.unit}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-foreground">₹{product.price}</span>
          <Button
            size="sm"
            className="h-8 gap-1 rounded-lg"
            onClick={() => addToCart(product)}
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
