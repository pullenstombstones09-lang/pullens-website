export function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(" ");
}

export function whatsappLink(number: string, message?: string): string {
  const clean = number.replace(/[^0-9+]/g, "");
  const base = `https://wa.me/${clean.replace("+", "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
