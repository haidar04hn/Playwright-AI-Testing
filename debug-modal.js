const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.demoblaze.com/index.html');
  await page.locator('#login2').click();
  await page.waitForTimeout(1000);
  const modal = page.locator('#logInModal');
  console.log('modal count', await modal.count());
  console.log('display', await page.locator('#logInModal').evaluate((el) => getComputedStyle(el).display));
  console.log('class', await page.locator('#logInModal').evaluate((el) => el.getAttribute('class')));
  console.log('visible', await page.locator('#logInModal').isVisible());
  console.log('username present', await page.locator('#loginusername').count());
  console.log('username attr', await page.locator('#loginusername').evaluate((el) => ({type: el.type, value: el.value, display: getComputedStyle(el).display, disabled: el.disabled}))); 
  await page.locator('#logInModal .close').click();
  await browser.close();
})();
