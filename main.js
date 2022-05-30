const fs = require("fs");
const puppeteer = require("puppeteer");
const themes = require("./theme.json");
async function captureScreenshot() {
    for( const {name} of themes) {
        if(!fs.existsSync(`${name}/screenshots`)) {
            fs.mkdirSync(`${name}/screenshots`);
        }
    }
   
let browser = null;

try {
    browser = await puppeteer.launch({ headless : true });

    const page = await browser.newPage();

    await page.setViewport({ width: 1440, height: 1080 });

    for(const { id,url,name} of themes) {
        await page.goto(url);
            await page.screenshot({ path : `${name}screenshots/${id}.jpeg`});
            console.log(`${name} captured`); 
                }
} catch(err){
    console.log(err.message);
} finally {
    if(browser){
       await browser.close();
    }
    console.log("captured");
  }
}

captureScreenshot();