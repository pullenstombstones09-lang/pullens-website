import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Pullen.*Tombstones/);
  });

  test("hero section has CTA button", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /free quote.*whatsapp/i }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", /wa\.me/);
  });

  test("header nav links work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Ranges" }).click();
    await expect(page).toHaveURL("/ranges");
    await expect(page.locator("h1")).toContainText(/range/i);
  });

  test("ranges overview lists all ranges", async ({ page }) => {
    await page.goto("/ranges");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByText("Prestige").first()).toBeVisible();
    await expect(page.getByText("Signature").first()).toBeVisible();
  });

  test("individual range page loads", async ({ page }) => {
    await page.goto("/ranges/prestige");
    await expect(page.locator("h1")).toContainText(/prestige/i);
  });

  test("FAQ page has expandable questions", async ({ page }) => {
    await page.goto("/faq");
    const details = page.locator("details").first();
    await expect(details).toBeVisible();
    await details.locator("summary").click();
    await expect(details).toHaveAttribute("open", "");
  });

  test("contact page shows both locations", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText("Pietermaritzburg", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("Pinetown", { exact: false }).first()).toBeVisible();
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("specials page loads", async ({ page }) => {
    await page.goto("/specials");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("pinetown page loads", async ({ page }) => {
    await page.goto("/pinetown");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
  });

  test("blog index lists articles", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("h1")).toContainText(/guide/i);
    await expect(page.getByRole("link", { name: /how to choose/i })).toBeVisible();
  });

  test("blog article loads", async ({ page }) => {
    await page.goto("/blog/how-to-choose-a-tombstone");
    await expect(page.locator("h1")).toContainText(/choose/i);
  });
});

test.describe("SEO", () => {
  test("homepage has JSON-LD structured data", async ({ page }) => {
    await page.goto("/");
    const scripts = page.locator('script[type="application/ld+json"]');
    await expect(scripts.first()).toBeAttached();
  });

  test("sitemap.xml is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
  });

  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
  });

  test("manifest.json is accessible", async ({ page }) => {
    const response = await page.goto("/manifest.json");
    expect(response?.status()).toBe(200);
  });
});

test.describe("Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: /open menu/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(page.getByRole("link", { name: "Ranges" })).toBeVisible();
    const closeButton = page.getByRole("button", { name: /close menu/i });
    await closeButton.click();
  });

  test("WhatsApp bar is visible on mobile", async ({ page }) => {
    await page.goto("/");
    const waBar = page.locator('[class*="fixed"]').filter({ hasText: /whatsapp/i });
    await expect(waBar.first()).toBeVisible();
  });
});
