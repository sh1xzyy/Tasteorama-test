const slowType = async (driver, field, text, delay = 0) => {
	for (let char of text) {
		await field.sendKeys(char)
		await driver.sleep(delay)
	}
}

module.exports = { slowType }
