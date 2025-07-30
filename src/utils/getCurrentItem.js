const { until, By } = require('selenium-webdriver')

const getCurrentItem = async (driver, i) => {
	const currentItem = await driver.wait(
		until.elementLocated(By.css(`ul li:nth-child(${i + 1})`))
	)
	await driver.wait(until.elementIsVisible(currentItem), 5000)

	return { currentItem }
}

module.exports = { getCurrentItem }
