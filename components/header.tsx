"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Store } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart-sheet";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import AuthButton from "@/components/AuthButton";
import Router from "next/router";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart } = useStore();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogoClick = () => {
    Router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Store
              className="h-5 w-5 text-primary-foreground"
              onClick={handleLogoClick}
            />
          </div>
          <div className="flex flex-col hidden md:flex">
            <span className="text-lg font-semibold text-foreground">
              Vijay Store
            </span>
            <span className="text-xs text-muted-foreground">
              Grain & Provision
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger className="flex items-center gap-1 px-4 py-2 hover:text-primary cursor-pointer rounded-md">
              Categories
              {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="bg-white shadow-md rounded-md p-2 mt-1 border border-border">
              <DropdownMenu.Item asChild>
                <Link
                  href="/category/rice"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-gray-100 rounded"
                >
                  Rice
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item asChild>
                <Link
                  href="/category/atta-flour"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-gray-100 rounded"
                >
                  Atta & Flour
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item asChild>
                <Link
                  href="/category/dals-pulses"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-gray-100 rounded"
                >
                  Dals
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link
                  href="/category/oils"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-gray-100 rounded"
                >
                  Oils
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link
                  href="/category/masala"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-gray-100 rounded"
                >
                  Masala
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link
                  href="/category/dry-fruits"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-gray-100 rounded"
                >
                  Dry Fruits
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link
                  href="/category/packaged-items"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-gray-100 rounded"
                >
                  Packaged Items
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4 ">
            <CartSheet>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </CartSheet>
            <AuthButton />
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80 px-6 py-6 bg-white">
              <SheetHeader className="pb-6 border-b border-muted">
                <SheetTitle className="text-lg font-semibold">
                  Vijay Store
                </SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  Grain & Provision
                </SheetDescription>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-6">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-foreground hover:text-primary transition"
                >
                  Home
                </Link>

                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Categories
                  </p>

                  <Link
                    href="/category/rice"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-foreground hover:text-primary transition"
                  >
                    Rice
                  </Link>

                  <Link
                    href="/category/atta-flour"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-foreground hover:text-primary transition"
                  >
                    Atta & Flour
                  </Link>

                  <Link
                    href="/category/dals-pulses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-foreground hover:text-primary transition"
                  >
                    Dals & Pulses
                  </Link>

                  <Link
                    href="/category/oils"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-foreground hover:text-primary transition"
                  >
                    Oils
                  </Link>

                  <Link
                    href="/category/masala"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-foreground hover:text-primary transition"
                  >
                    Masala
                  </Link>

                  <Link
                    href="/category/dry-fruits"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-foreground hover:text-primary transition"
                  >
                    Dry Fruits
                  </Link>

                  <Link
                    href="/category/packaged-items"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-foreground hover:text-primary transition"
                  >
                    Packaged Items
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
