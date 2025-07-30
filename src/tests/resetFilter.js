const { until, By, Key } = require('selenium-webdriver')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')

const resetFilter = async driver => {
	console.log('--------------- Reset Filter Started ---------------')

	// Находим кнопку Reset Filters (в DOM и визуально) - прокручиваем стр. до кнопки - нажимаем
	const resetFilters = await driver.wait(
		until.elementLocated(
			By.xpath('//button[contains(text(), "Reset Filters")]')
		)
	)
	await driver.wait(until.elementIsVisible(resetFilters))
	await scrollWindowToElement(driver, resetFilters, 1000)
	await resetFilters.click()

	console.log('--------------- Reset Filter Ended ---------------')

	return { resetFilterLog: 'successfully' }
}

module.exports = { resetFilter }
