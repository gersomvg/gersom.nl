const chromium = require('chrome-aws-lambda');
const fs = require('fs');
const path = require('path');

module.exports = async posts => {
  console.log('🖼 Generating og:image for all posts');

  const browser = await chromium.puppeteer.launch({
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
    './avatar.jpeg',
    `data:image/jpeg;charset=utf-8;base64,${avatar}`
  );

  let font = fs.readFileSync(
    path.resolve(__dirname, './helvetica-neue-bold.ttf'),
    {
      encoding: 'base64',
    }
  );
  html = html.replace(
    "'./helvetica-neue-bold.ttf'",
    `data:application/x-font-ttf;charset=utf-8;base64,${font}`
  );

  await page.setContent(html, {
    waitUntil: ['domcontentloaded', 'networkidle0'],
  });

  await page.setViewport({
    width: 1200,
    height: 632,
    deviceScaleFactor: process.env.NETLIFY === 'true' ? 1 : 2,
  });

  let dir = path.resolve(__dirname, '../../../public/og-images');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  dir = `${dir}/post`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  for (const post of posts) {
    await page.evaluate($post => {
      let dom = document.querySelector('#title');
      dom.innerHTML = $post.title;
    }, post);
    await page.screenshot({
      path: `${dir}/${post.slug.replace(/\//g, '')}.jpeg`,
      type: 'jpeg',
      quality: 100,
      clip: { x: 0, y: 0, width: 1200, height: 632 },
    });
  }

  await browser.close();
};
