"use client";

import { MessageCircle } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

const pmb = LOCATIONS[0];

export function WhatsAppBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
      <a
        href={whatsappLink(pmb.whatsapp, "Hi, I'd like to enquire about a tombstone.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm min-h-12 w-full"
      >
        <MessageCircle className="h-5 w-5" />
        Chat on WhatsApp
      </a>
    </div>
  );
}
