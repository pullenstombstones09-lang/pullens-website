import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

type ButtonVariant = "cta" | "secondary" | "whatsapp";

interface ButtonProps {
  variant: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  cta: "bg-orange text-white hover:bg-orange/90",
  secondary: "bg-navy text-white hover:bg-navy/90",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#25D366]/90",
};

const baseStyles =
  "min-h-[48px] px-6 py-3 inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12)] cursor-pointer";

export function Button({
  variant,
  href,
  children,
  className,
  onClick,
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className ?? "");

  const content = (
    <>
      {variant === "whatsapp" && <MessageCircle className="h-5 w-5" />}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
