const { v4: uuidv4 } = require('uuid');
const Browser = require('./browser')
const scrapNftsProcess = require('../processes/scrapNftsProcess')


function Call(keyword) {

    //Assigning uuid to uniquely identify the objects
    this.uuid = uuidv4()
    this.keyword = keyword

    //A wrapped Promise contained function to avoid Promise chaining
    this.performProcesses = () => {

        return new Promise(async (resolve, reject) => {

            //handling exception for the promises
            try {

                // launching browser
                let browser = new Browser()

                await browser.startBrowser()

                // scrap NFTs process
                let returnObj = await scrapNftsProcess(browser)

                await browser.closeBrowser()

                //return object, make it as api response object

                return resolve(returnObj)

            } catch (e) {

                console.log(e)

                let returnObj = { status: 'failure', message: 'Processes Failed' };

                //return object in case of exception, make it as api response object
                return reject(returnObj)

            }

        })

    }
}

module.exports = Call