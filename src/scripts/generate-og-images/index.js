const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer');
const puppeteerCore = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const useCore = process.env.NETLIFY === 'true';

  const browser = await (useCore ? puppeteerCore : puppeteer).launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  let html = fs
    .readFileSync(path.resolve(__dirname, './template.html'))
    .toString();
  let avatar = fs.readFileSync(path.resolve(__dirname, './avatar.jpeg'), {
    encoding: 'base64',
  });
  html = html.replace(
    '{{avatar}}',
    `data:image/jpeg;charset=utf-8;base64,${avatar}`
  );

  await page.setContent(html, {
    waitUntil: ['domcontentloaded', 'networkidle0'],
  });

  await page.setViewport({
    width: 700,
    height: 750,
    deviceScaleFactor: 1,
  });

  await page.screenshot({
    path: path.resolve(__dirname, '../../../public/test.jpeg'),
    type: 'jpeg',
    quality: 90,
    fullPage: true,
  });

  await browser.close();
};
