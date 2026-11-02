/**
 * Shown on every trade price that is still derived from retail
 * (TRADE_PLACEHOLDER_DISCOUNT) rather than the real trade list.
 */
export function SamplePricingBadge() {
  return (
    <span className="inline-block rounded-sm bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide">
      Sample trade pricing
    </span>
  );
}
