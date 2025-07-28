const { until, By, Key } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')

const resetFilter = async driver => {
	const resetFilters = await driver.wait(
		until.elementLocated(
			By.xpath('//button[contains(text(), "Reset Filters")]')
		)
	)

	await driver.wait(until.elementIsVisible(resetFilters))

	await resetFilters.click()
}

module.exports = { resetFilter }
