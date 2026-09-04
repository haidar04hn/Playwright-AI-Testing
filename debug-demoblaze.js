const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.demoblaze.com/index.html');
  await page.waitForFunction(() => document.querySelectorAll('.card-title').length > 0, { timeout: 15000 });

  console.log('CARD_TITLES=' + await page.locator('.card-title').count());

  await page.click('#login2');
  await page.locator('#loginusername').waitFor({ state: 'visible', timeout: 10000 });

  const loginDialog = page.waitForEvent('dialog');
  await page.locator('#loginusername').fill('');
  await page.locator('#loginpassword').fill('');
  await page.locator('button[onclick="logIn()"]').click({ force: true });
  const loginAlert = await loginDialog;
  console.log('LOGIN_ALERT=' + loginAlert.message());
  await loginAlert.accept();

  await page.locator('#logInModal .close').click();
  await page.click('#signin2');
  await page.locator('#sign-username').waitFor({ state: 'visible', timeout: 10000 });

  const signUpDialog = page.waitForEvent('dialog');
  await page.locator('#sign-username').fill('');
  await page.locator('#sign-password').fill('');
  await page.locator('button[onclick="register()"]').click({ force: true });
  const signAlert = await signUpDialog;
  console.log('SIGNUP_ALERT=' + signAlert.message());
  await signAlert.accept();

  await browser.close();
})();
