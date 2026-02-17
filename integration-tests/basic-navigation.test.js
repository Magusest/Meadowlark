import puppeteer from "puppeteer";
import portfinder from "portfinder";
import app from "../meadowlark.js";

let server = null;
let port = null;

beforeEach(async () => {
  port = await portfinder.getPortPromise();
  server = app.listen(port);
});

afterEach(() => {
  if (server) server.close();
});

test("home page link to about page", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`);
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-test-id="about"]'),
  ]);

  expect(page.url()).toBe(`http://localhost:${port}/about`);
  await browser.close();
});
