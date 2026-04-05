"use client";

import { ReactNode, useState, useEffect } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface CartSheetProps {
  children: ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
  const { cart, updateQuantity, removeFromCart, clearCart, addOrder } =
    useStore();
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // const user = JSON.parse(localStorage.getItem("user") || "null");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleCheckout = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login?redirect=/cart");
      return;
    }

    setIsCheckout(true);
  };

  const handlePlaceOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    addOrder({
      customerName: user.name,
      phone: user.phone,
      address: user.address,
      items: cart,
      total,
    });

    clearCart();
    setOrderPlaced(true);
    setIsCheckout(false);
  };

  const handleCloseOrderConfirmation = () => {
    setOrderPlaced(false);
    clearCart();
    router.push("/");
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        {orderPlaced ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-8 ">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-primary">
                Order Placed Successfully!
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Thank you for your order. We will deliver soon.
              </p>
            </div>
            <Button onClick={handleCloseOrderConfirmation} className="mt-4">
              Continue Shopping
            </Button>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            {!isCheckout ? (
              <>
                <div className="flex-1 overflow-y-auto py-4 px-2">
                  <div className="flex flex-col gap-4">
                    <div className="rounded-lg border p-3 text-sm">
                      <p className="font-medium">Delivering to:</p>
                      <p>{user?.name}</p>
                      <p>{user?.phone}</p>
                      <p>{user?.address}</p>
                    </div>

                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 rounded-lg border bg-card p-3"
                      >
                        <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center text-2xl">
                          {item.category === "Rice" && "🍚"}
                          {item.category === "Atta & Flour" && "🌾"}
                          {item.category === "Dals & Pulses" && "🫘"}
                          {item.category === "Oil" && "🫒"}
                          {item.category === "Masala" && "🌶️"}
                          {item.category === "Dry Fruits" && "🥜"}
                          {item.category === "Packaged Items" && "📦"}
                        </div>

                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ₹{item.price}/{item.unit}
                          </p>

                          <div className="mt-2 flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>

                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className="font-semibold">
                            ₹{item.price * item.quantity}
                          </span>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 pb-1 px-2">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>

                  <Button
                    className="mt-4 w-full"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 py-4 px-2">
                  <div className="flex flex-col gap-4">
                    <div className="rounded-lg border p-3 text-sm">
                      <p className="font-medium">Delivering to:</p>
                      <p>{user?.name}</p>
                      <p>{user?.phone}</p>
                      <p>{user?.address}</p>
                    </div>

                    <div className="rounded-lg bg-muted/50 py-4 px-2">
                      <h4 className="font-medium mb-2">Order Summary</h4>

                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm py-1"
                        >
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}

                      <Separator className="my-2" />

                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 flex gap-2 pb-1 px-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsCheckout(false)}
                  >
                    Back
                  </Button>

                  <Button className="flex-1" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
