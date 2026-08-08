import { test, expect } from "@playwright/test";

test("user can load the audit page and trigger an example audit", async ({ page }) => {
  // Intercept the chat API call so this test never hits the real Gemini API
  // or consumes real quota — return a minimal fake streamed response instead.
  await page.route("**/api/chat", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "text/plain",
      body: `0:"Test response from mocked route."\n`,
    });
  });

  await page.goto("http://localhost:3000/audit");
  await expect(page.getByRole("button", { name: /example\.com/i })).toBeVisible();
  await page.getByRole("button", { name: /example\.com/i }).click();
  // Confirm the mocked response renders in the chat
  await expect(page.getByText(/test response from mocked route/i)).toBeVisible({ timeout: 10000 });
});
