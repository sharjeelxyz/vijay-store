"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingButtons() {
  const whatsappNumber = "+919819128805";
  const phoneNumber = "+019819128805";
  const message = "Hi, I want to order groceries from Vijay Store";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <a
        href={`tel:${phoneNumber}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg transition-transform hover:scale-110"
        aria-label="Call us"
      >
        <Phone className="h-5 w-5 text-primary-foreground" />
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <img src="/assets/whatsapp.png" alt="whatsapp" className="h-6 w-6" />
      </a>
    </div>
  );
}
