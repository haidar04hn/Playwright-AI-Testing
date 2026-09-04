const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.demoblaze.com/index.html');

  async function probe(label, user, passw) {
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill(user);
    await page.locator('#loginpassword').fill(passw);
    await page.locator('button[onclick="logIn()"]').click();
    await page.waitForTimeout(800);
    console.log('--- ' + label + ' ---');
    console.log('loginModalVisible=' + await page.locator('#logInModal').isVisible());
    console.log('welcomeCount=' + await page.locator('#nameofuser').count());
    console.log('welcomeText=' + JSON.stringify(await page.locator('#nameofuser').textContent()));
    console.log('login2Visible=' + await page.locator('#login2').isVisible());
    console.log('logout2Count=' + await page.locator('#logout2').count());
    await page.locator('#logInModal .close').click();
    await page.waitForTimeout(300);
  }

  await probe('blank username', '', 'Test@123');
  await probe('blank password', 'Haidarali', '');

  await browser.close();
})();
