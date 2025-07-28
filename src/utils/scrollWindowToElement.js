const scrollWindowToElement = async (driver, element) => {
	await driver.executeScript('arguments[0].scrollIntoView(true)', element)
}

module.exports = { scrollWindowToElement }
