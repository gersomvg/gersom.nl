const chromium = require('chrome-aws-lambda');
const fs = require('fs');
const path = require('path');

module.exports = async posts => {
  console.log('📄 Generating cv.pdf');

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(
    `file:${path.resolve(__dirname, '../../../public/cv/index.html')}`,
    {
      waitUntil: ['domcontentloaded'],
    }
  );

  await page.evaluateHandle('document.fonts.ready');

  await page.pdf({
    path: `${path.resolve(__dirname, '../../../public')}/cv.pdf`,
    format: 'A4',
    margin: {
      top: 60,
      bottom: 60,
      left: 60,
      right: 60,
    },
    printBackground: true,
  });

  await browser.close();
};
