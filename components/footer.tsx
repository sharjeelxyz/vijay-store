import { Store, MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Store className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-semibold text-foreground">
                  Vijay Store
                </span>
                <p className="text-xs text-muted-foreground">
                  Grain & Provision Merchant
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for quality grains, dals, oils, and daily
              essentials since 1962.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Categories
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/category/rice"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Rice
              </Link>
              <Link
                href="/category/atta-flour"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Atta & Flour
              </Link>
              <Link
                href="/category/dals-pulses"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Dals & Pulses
              </Link>
              <Link
                href="/category/oil"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Oils
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Contact Us
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Shop No. 12, Dadar Market,
                  <br />
                  Mumbai - 400014
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  +91 98765 43210
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  9:00 AM - 9:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              About Us
            </h4>
            <p className="text-sm text-muted-foreground">
              We are committed to providing the best quality grains and
              provisions at affordable prices. Serving Mumbai since 1962 with
              trust and quality.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vijay Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
