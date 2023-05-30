const cheerio = require("cheerio");
const axios = require("axios");
const {
  Builder,
  Browser,
  By,
  Key,
  until,
  logging,
} = require("selenium-webdriver");
 
(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get("https://besttime.app/demo/searchvenues"); //
    await driver.findElement(By.id("q")).sendKeys("supermarket");
    await driver.findElement(By.id("q_loc")).sendKeys("cap sud abidjan");
    await driver.findElement(By.id("submit")).click();
    await setTimeout(async () => {
      await driver.findElement(By.css('div[venue_table_id="0"]')).click();
      let link = await driver
        .findElement(By.id("btnforecastdetails"))
        .getAttribute("href");
      if (link) {
        example2(link);
      }
    }, 10000);
  } finally {
    //driver.quit();
  }
})();

async function example2(url) {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get(url);
    let api_results_venue = await driver
      .findElement(By.id("api_results_venue"))
      .getText();
    let api_results_peak = await driver
      .findElement(By.id("api_results_peak"))
      .getText();
    let api_results_busy = await driver
      .findElement(By.id("api_results_busy"))
      .getText();
    let api_results_quiet = await driver
      .findElement(By.id("api_results_quiet"))
      .getText();
    let api_results_surge = await driver
      .findElement(By.id("api_results_surge"))
      .getText();
    let api_results_dayraw = await driver
      .findElement(By.id("api_results_dayraw"))
      .getText();

    let data = {
      api_results_venue: await JSON.parse(api_results_venue),
      api_results_peak: await JSON.parse(api_results_peak),
      api_results_busy: await JSON.parse(api_results_busy),
      api_results_quiet: await JSON.parse(api_results_quiet),
      api_results_surge: await JSON.parse(api_results_surge),
      api_results_dayraw: await JSON.parse(api_results_dayraw),
    };
    console.log(await data);
    return data;
  } catch (err) {
    driver.navigate().refresh();
  } finally {
    // driver.quit();
  }
}
