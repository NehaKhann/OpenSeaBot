const selectors = require('../selectors');

const scrapNftsProcess = (browser) => {
	return new Promise(async (resolve, reject) => {
		try {
			let page = browser.page;
			await page.goto('https://opensea.io/explore-collections');

			await page.waitForSelector(selectors.NFT);

			// let nfts = await page.evaluate(() =>
			// 	Array.from(
			// 		document.querySelectorAll(
			// 			'#main > div > div.sc-1xf18x6-0.iEuaSf > div > div > div > div > a > div.sc-1xf18x6-0.sc-1twd32i-0.haVRLx.kKpYwv.CarouselCard--content.CollectionCard--content'
			// 		)
			// 	).map((x) => {
			// 		let col = Array.from(
			// 			x.querySelectorAll(
			// 				'div.sc-1xf18x6-0.sc-1twd32i-0.WjTBI.kKpYwv > div.sc-1xf18x6-0.sc-1w94ul3-0.haVRLx.bjsuxj.CollectionCard--name'
			// 			)
			// 		).map((y) => y.innerHTML)[0];
			// 	})
			// );
			// console.log(nfts);

			let nfts = await page.evaluate(() => {
				return Array.from(
					document.querySelectorAll(
						'#main > div > div.sc-1xf18x6-0.iEuaSf > div > div > div > div > a > div.sc-1xf18x6-0.sc-1twd32i-0.haVRLx.kKpYwv.CarouselCard--content.CollectionCard--content'
					)
						).map((x) => {
					let col = Array.from(
						x.querySelectorAll(
							'div.sc-1xf18x6-0.sc-1twd32i-0.WjTBI.kKpYwv > div.sc-1xf18x6-0.sc-1w94ul3-0.haVRLx.bjsuxj.CollectionCard--name'
						)
					).map((y) => y.innerHTML)[0];

					let creator = Array.from(
						x.querySelectorAll(
							'div.sc-1xf18x6-0.sc-1twd32i-0.fUvczM.kKpYwv > div > a.sc-1pie21o-0.hmVtez.sc-1xf18x6-0.jQBTGb.AccountLink--ellipsis-overflow > span'
						)
					).map((y) => y.innerHTML)[0];

					let desc = Array.from(
						x.querySelectorAll('.CollectionCard--description div, span, p')
					).map((y) => y.innerText);

					let concatDesc = '';
					for (let i in desc) {
						if (
							concatDesc.indexOf(desc[i]) == -1 &&
							desc[i] != 'by' &&
							desc[i] != creator
						) {
							concatDesc += desc[i];
						}
					}

					return {
						collection: col ? col : '',
						creator: creator ? creator : '',
						description: concatDesc,
					};
				});
			});

			console.log(nfts);

			// let nfts = await page.$$eval(selectors.NFT, (elms) =>
			// 	elms.map((x) => {
			// 		parser = new DOMParser();
			// 		xmlDoc = parser.parseFromString(x, 'text/xml');

			// 		let col = x.$$eval(
			// 			'div.sc-1xf18x6-0.sc-1twd32i-0.WjTBI.kKpYwv > div.sc-1xf18x6-0.sc-1w94ul3-0.haVRLx.bjsuxj.CollectionCard--name',
			// 			(cols) => (cols[0] ? cols[0] : '')
			// 		);

			// 		let creator = x.$$eval(
			// 			'div.sc-1xf18x6-0.sc-1twd32i-0.fUvczM.kKpYwv > div > a.sc-1pie21o-0.hmVtez.sc-1xf18x6-0.jQBTGb.AccountLink--ellipsis-overflow > span',
			// 			(creators) => (creators[0] ? creators[0] : '')
			// 		);

			// 		let desc = x.$$eval('span > span', (decrips) =>
			// 			decrips[0] ? decrips[0] : ''
			// 		);

			// 		return {
			// 			collection: col,
			// 			creator: creator,
			// 			description: desc,
			// 		};
			// 	})
			// );

			// console.log(nfts);

			// await page.waitForSelector(selectors.NFT_COLLECTION_SELECTOR);

			// let nftColArr = await page.$$eval(
			// 	selectors.NFT_COLLECTION_SELECTOR,
			// 	(elms) => elms.map((x) => x.innerHTML)
			// );

			// console.log(nftColArr);

			// const nftInfo = [];
			// for (x in nftColArr) {
			// 	await page.waitForSelector(
			// 		`#main > div > div.sc-1xf18x6-0.iEuaSf > div > div > div:nth-child(${
			// 			Number(x) + 1
			// 		}) > div > a > div.sc-1xf18x6-0.sc-1twd32i-0.haVRLx.kKpYwv.CarouselCard--content.CollectionCard--content > div.sc-1xf18x6-0.sc-1twd32i-0.fUvczM.kKpYwv > div > a.sc-1pie21o-0.hmVtez.sc-1xf18x6-0.jQBTGb.AccountLink--ellipsis-overflow > span`
			// 	);

			// 	let nftCreatorArr = await page.$$eval(
			// 		`#main > div > div.sc-1xf18x6-0.iEuaSf > div > div > div:nth-child(${
			// 			Number(x) + 1
			// 		}) > div > a > div.sc-1xf18x6-0.sc-1twd32i-0.haVRLx.kKpYwv.CarouselCard--content.CollectionCard--content > div.sc-1xf18x6-0.sc-1twd32i-0.fUvczM.kKpYwv > div > a.sc-1pie21o-0.hmVtez.sc-1xf18x6-0.jQBTGb.AccountLink--ellipsis-overflow > span`,
			// 		(elms) => elms.map((x) => x.innerHTML)
			// 	);

			// 	console.log(nftCreatorArr);

			// 	await page.waitForSelector(
			// 		`#main > div > div.sc-1xf18x6-0.iEuaSf > div > div > div:nth-child(${
			// 			Number(x) + 1
			// 		}) > div > a > div.sc-1xf18x6-0.sc-1twd32i-0.haVRLx.kKpYwv.CarouselCard--content.CollectionCard--content > span > span`
			// 	);

			// 	let nftDescArr = await page.$$eval(
			// 		`#main > div > div.sc-1xf18x6-0.iEuaSf > div > div > div:nth-child(${
			// 			Number(x) + 1
			// 		}) > div > a > div.sc-1xf18x6-0.sc-1twd32i-0.haVRLx.kKpYwv.CarouselCard--content.CollectionCard--content > span > span`,
			// 		(elms) => elms.map((x) => x.innerHTML)
			// 	);

			// 	console.log(nftDescArr);

			// 	nftInfo.push({
			// 		collection: nftColArr[x],
			// 		creator: nftCreatorArr[0] ? nftCreatorArr[0] : '',
			// 		description: nftDescArr[0] ? nftDescArr[0] : '',
			// 	});
			// }

			// for (x in nftColArr) {
			// 	nftInfo.push({
			// 		collection: nftColArr[x],
			// 		creator: nftCreatorArr[x],
			// 		description: nftDescArr[x],
			// 	});
			// }

			let returnObj = {
				status: 'success',
				message: 'Scrapping Successfull',
				nfts: nfts,
			};

			return resolve(returnObj);
		} catch (e) {
			console.log(e);

			let returnObj = { status: 'failure', message: 'Scrapping Failed' };
			return reject(returnObj);
		}
	});
};

module.exports = scrapNftsProcess;
