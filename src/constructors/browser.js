const { v4: uuidv4 } = require('uuid');
const puppeteer = require('puppeteer');

function Browser() {
	this.uuid = uuidv4();
	this.page = undefined;
	this.instance = undefined;
	this.startBrowser = () => {
		return new Promise(async (resolve, reject) => {
			try {
				browser = this;

				browser.instance = await puppeteer.launch({
					//slowMo: 100, // to slowdown the process

					headless: false, //  set as false to open a chromium

					ignoreDefaultArgs: ['--enable-automation'],

					defaultViewport: null,

					args: [
						'--no-sandbox',

						'--disable-setuid-sandbox',

						'--start-maximized',

						'--window-size=1920,1080',

						'--disable-gpu',

						'--disable-dev-profile',
					],

					timeout: 60000,
				});

				browser.instance.on('disconnected', function () {
					browser.instance = undefined;
				});
				browser.page = await browser.instance.newPage();

				await browser.page.setViewport({ width: 1920, height: 1080 });

				browser.page.setUserAgent(
					'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
				);

				resolve();
			} catch (e) {
				reject(e);
			}
		});
	};
	this.closeBrowser = () => {
		return new Promise(async (resolve, reject) => {
			try {
				browser = this;

				console.log(new Date().toLocaleString() + ' Closing browser..');

				//console.log(new Date().toLocaleString() + ' Browser uuid: ', browser.email);

				//browserInstances.splice(browserInstances.indexOf(browserInstances.find(brw => brw.uuid === browser.uuid)),1);

				//console.log(new Date().toLocaleString() + ' Number of Instances Running: ', browserInstances.length);

				browser.instance.close();

				return resolve('Browser Closed');
			} catch (e) {
				console.error(new Date().toLocaleString() + ': ', e);

				return reject(e);
			}
		});
	};
}

module.exports = Browser;
