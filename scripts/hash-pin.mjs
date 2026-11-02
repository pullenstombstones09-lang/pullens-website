#!/usr/bin/env node
/**
 * Generate a scrypt PIN hash for a trade account.
 *
 *   node scripts/hash-pin.mjs 12345
 *
 * Paste the printed value into trade_accounts.pin_hash.
 */
import { randomBytes, scryptSync } from "node:crypto";

const pin = process.argv[2];
if (!pin || !/^\d{4,12}$/.test(pin)) {
  console.error("Usage: node scripts/hash-pin.mjs <PIN of 4-12 digits>");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(pin, salt, 64);
console.log(`scrypt$${salt.toString("hex")}$${hash.toString("hex")}`);
