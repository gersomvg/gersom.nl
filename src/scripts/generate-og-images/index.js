const chromium = require('chrome-aws-lambda');
const fs = require('fs-extra');
const path = require('path');

module.exports = async posts => {
  console.log('🖼 Generating og:image for all posts');

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: true, //chromium.headless,
  });

  const page = await browser.newPage();

  let html = (
    await fs.readFile(path.resolve(__dirname, './template.html'))
  ).toString();

  let avatar = await fs.readFile(path.resolve(__dirname, './avatar.jpeg'), {
    encoding: 'base64',
  });
  html = html.replace(
    './avatar.jpeg',
    `data:image/jpeg;charset=utf-8;base64,${avatar}`
  );

  let font = await fs.readFile(path.resolve(__dirname, './Roboto-Bold.ttf'), {
    encoding: 'base64',
  });
  html = html.replace(
    "'./Roboto-Bold.ttf'",
    `data:application/x-font-ttf;charset=utf-8;base64,${font}`
  );

  await page.setContent(html, {
    waitUntil: ['domcontentloaded'],
  });

  await page.evaluateHandle('document.fonts.ready');

  await page.setViewport({
    width: 1200,
    height: 632,
    deviceScaleFactor: process.env.NETLIFY === 'true' ? 1 : 2,
  });

  const baseDir = path.resolve(__dirname, '../../../public/og-images/');
  fs.ensureDir(path.resolve(baseDir, 'post'));
  fs.ensureDir(path.resolve(baseDir, 'recipe'));

  for (const post of posts) {
    await page.evaluate($post => {
      let dom = document.querySelector('#title');
      dom.innerHTML = $post.title;
    }, post);
    await page.screenshot({
      path: `${baseDir}${post.slug.slice(0, -1)}.jpeg`,
      type: 'jpeg',
      quality: 100,
      clip: { x: 0, y: 0, width: 1200, height: 632 },
    });
  }

  await browser.close();
};
