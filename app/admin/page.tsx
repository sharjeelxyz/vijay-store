"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Store, 
  Package, 
  ShoppingBag, 
  Plus, 
  Clock, 
  Truck,
  CheckCircle2,
  ArrowLeft,
  Trash2
} from "lucide-react"
import { StoreProvider, useStore, categories, Order } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function AdminContent() {
  const { products, addProduct, orders, updateOrderStatus, setDeliveryTime } = useStore()
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    unit: "kg",
    image: "",
  })
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) return
    
    addProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      unit: newProduct.unit,
      image: newProduct.image || `/images/${newProduct.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    })
    
    setNewProduct({ name: "", price: "", category: "", unit: "kg", image: "" })
  }

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800"
      case "in-progress": return "bg-yellow-100 text-yellow-800"
      case "delivered": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "new": return <ShoppingBag className="h-4 w-4" />
      case "in-progress": return <Truck className="h-4 w-4" />
      case "delivered": return <CheckCircle2 className="h-4 w-4" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Store</span>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Store className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Vijay Store Admin</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
              {orders.filter(o => o.status === "new").length > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                  {orders.filter(o => o.status === "new").length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="inventory" className="gap-2">
              <Package className="h-4 w-4" />
              Inventory
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Orders</h2>
                <p className="text-muted-foreground">Manage customer orders</p>
              </div>
            </div>

            {orders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">No orders yet</p>
                  <p className="text-sm text-muted-foreground">Orders will appear here when customers place them</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{order.customerName}</CardTitle>
                          <CardDescription>{order.phone}</CardDescription>
                        </div>
                        <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status.replace("-", " ")}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        <p>{order.address}</p>
                        <p className="mt-2 flex items-center gap-1.5 text-xs bg-muted/50 rounded-md px-2 py-1 w-fit">
                          <Clock className="h-3 w-3" />
                          Ordered: {order.time}
                        </p>
                      </div>

                      <div className="rounded-lg bg-muted/50 p-3">
                        <p className="text-sm font-medium mb-2">Items:</p>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={`${order.id}-${item.id}-${index}`} className="flex justify-between text-sm">
                              <span>{item.name} x {item.quantity}</span>
                              <span className="font-medium">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>₹{order.total}</span>
                        </div>
                      </div>

                      {order.status !== "delivered" && (
                        <div className="space-y-3">
                          {/* Delivery Time Selection */}
                          <div>
                            <p className="text-sm font-medium mb-2">Delivery Time:</p>
                            <div className="flex flex-wrap gap-2">
                              {[15, 30, 45, 60].map((mins) => (
                                <Button
                                  key={mins}
                                  variant={order.deliveryTime === mins ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setDeliveryTime(order.id, mins)}
                                >
                                  {mins} mins
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Status Update */}
                          <div className="flex gap-2">
                            {order.status === "new" && (
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "in-progress")}
                                className="gap-1"
                              >
                                <Truck className="h-4 w-4" />
                                Start Delivery
                              </Button>
                            )}
                            {order.status === "in-progress" && (
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "delivered")}
                                className="gap-1"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                                Mark Delivered
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Inventory</h2>
              <p className="text-muted-foreground">Manage your products</p>
            </div>

            {/* Add Product Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Basmati Rice"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g., 150"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.slug} value={cat.name}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select
                      value={newProduct.unit}
                      onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="ml">ml</SelectItem>
                        <SelectItem value="piece">piece</SelectItem>
                        <SelectItem value="pack">pack</SelectItem>
                        <SelectItem value="100g">100g</SelectItem>
                        <SelectItem value="250g">250g</SelectItem>
                        <SelectItem value="500g">500g</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      className="w-full gap-2"
                      onClick={handleAddProduct}
                      disabled={!newProduct.name || !newProduct.price || !newProduct.category}
                    >
                      <Plus className="h-4 w-4" />
                      Add Product
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product List */}
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle>Product List ({filteredProducts.length})</CardTitle>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.slug} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left text-sm text-muted-foreground">
                        <th className="pb-3 font-medium">Product</th>
                        <th className="pb-3 font-medium">Category</th>
                        <th className="pb-3 font-medium">Price</th>
                        <th className="pb-3 font-medium">Unit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="text-sm">
                          <td className="py-3 font-medium">{product.name}</td>
                          <td className="py-3">
                            <Badge variant="secondary">{product.category}</Badge>
                          </td>
                          <td className="py-3">₹{product.price}</td>
                          <td className="py-3 text-muted-foreground">{product.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default function AdminPage() {
  return (
    <StoreProvider>
      <AdminContent />
    </StoreProvider>
  )
}
