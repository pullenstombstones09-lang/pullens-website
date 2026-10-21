"use client";

import { useSyncExternalStore } from "react";
import type { CoveringKey } from "./pricing";

export interface CartItem {
  id: string;
  code: string;
  rangeSlug: string;
  rangeName: string;
  imagePath: string;
  covering: CoveringKey;
  coveringLabel: string;
  stoneTotal: number;
  extras: { id: string; name: string; price: number }[];
  extrasTotal: number;
  inscription: string;
  total: number;
}

const KEY = "pullens-cart-v1";
const REF_KEY = "pullens-ref";
const EVENT = "pullens-cart-change";

function read(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable — cart lives in memory for this page only */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function addToCart(item: Omit<CartItem, "id">): CartItem {
  const full: CartItem = { ...item, id: `${item.code}-${Date.now().toString(36)}` };
  write([...read(), full]);
  return full;
}

export function removeFromCart(id: string) {
  write(read().filter((i) => i.id !== id));
}

export function clearCart() {
  write([]);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((s, i) => s + i.total, 0);
}

let cache: { raw: string; items: CartItem[] } = { raw: "", items: [] };

function getSnapshot(): CartItem[] {
  let raw = "";
  try {
    raw = window.localStorage.getItem(KEY) ?? "";
  } catch {
    raw = "";
  }
  if (raw !== cache.raw) cache = { raw, items: read() };
  return cache.items;
}

const EMPTY: CartItem[] = [];
function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { items, total: cartTotal(items), count: items.length };
}

/* ---------- referral code ---------- */

export function rememberReferral(code: string) {
  try {
    window.localStorage.setItem(REF_KEY, code.trim().toUpperCase());
  } catch {
    /* ignore */
  }
}

export function getReferral(): string {
  try {
    return window.localStorage.getItem(REF_KEY) ?? "";
  } catch {
    return "";
  }
}
