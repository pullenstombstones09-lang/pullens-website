import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/shop/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Place your memorial order. We confirm every order on WhatsApp.",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutForm />
    </Suspense>
  );
}
