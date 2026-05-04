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
  cta: "bg-gold text-dark hover:bg-gold-bright font-semibold",
  secondary: "bg-transparent text-ink border border-hairline hover:border-gold/40 hover:text-gold",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp/90 font-semibold",
};

const baseStyles =
  "min-h-[48px] px-6 py-3 inline-flex items-center justify-center gap-2 rounded-sm text-sm transition-all duration-200 cursor-pointer";

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
      {variant === "whatsapp" && <MessageCircle className="h-4 w-4" />}
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
