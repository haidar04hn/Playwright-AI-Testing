const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.demoblaze.com/index.html', { waitUntil: 'domcontentloaded', timeout: 30000 });

  const selectors = [
    '#login2', '#signin2', '#cartur', '#nameofuser', '#loginusername', '#loginpassword',
    'button[onclick="logIn()"]', 'button[onclick="register()"]', '#sign-username', '#sign-password',
    '#logInModal', '#signInModal', '#contactModal', '#exampleModal', 'a[href="#"]', 'a[href="index.html"]'
  ];

  for (const selector of selectors) {
    const count = await page.locator(selector).count();
    console.log(`${selector}: ${count}`);
    if (count > 0) {
      const first = page.locator(selector).first();
      console.log('visible=', await first.isVisible().catch(() => 'ERR'));
      console.log('text=', await first.textContent().catch(() => 'ERR'));
    }
  }

  console.log('links', await page.locator('a').evaluateAll(els => els.map(el => ({ text: el.textContent.trim(), href: el.getAttribute('href') })).slice(0, 50)));

  await browser.close();
})();
