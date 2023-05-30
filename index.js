const cheerio = require("cheerio")
const axios = require("axios")
const {Builder, Browser, By, Key, until,logging} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('https://besttime.app/demo/forecastdetails?venue_id=ven_63334f672d35324f4a75715238517742446135394f65664a496843');
    let api_results_venue = await driver.findElement(By.id("api_results_venue")).getText()
    let api_results_peak = await driver.findElement(By.id("api_results_peak")).getText()
    let api_results_busy = await driver.findElement(By.id("api_results_busy")).getText()
    let api_results_quiet = await driver.findElement(By.id("api_results_quiet")).getText()
    let api_results_surge = await driver.findElement(By.id("api_results_surge")).getText()
    let api_results_dayraw = await driver.findElement(By.id("api_results_dayraw")).getText()

    let data = {
        api_results_venue:await JSON.parse(api_results_venue),
        api_results_peak:await JSON.parse(api_results_peak),
        api_results_busy:await JSON.parse(api_results_busy),
        api_results_quiet:await JSON.parse(api_results_quiet),
        api_results_surge:await JSON.parse(api_results_surge),
        api_results_dayraw:await JSON.parse(api_results_dayraw)
    }
    console.log(await data)
    return 
  }
  catch(err) {
    driver.navigate().refresh()
  }  
  finally {
   // driver.quit();
  }
})();
