const tempProcess = () => {
	return new Promise(async (resolve, reject) => {
		try {
			return resolve('pass');
		} catch (e) {
			console.log(e);
			return reject();
		}
	});
};

module.exports = tempProcess;
