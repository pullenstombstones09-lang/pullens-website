import type { Metadata } from "next";
import { CartView } from "@/components/shop/cart-view";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the memorial you have chosen before checkout.",
};

export default function CartPage() {
  return <CartView />;
}
