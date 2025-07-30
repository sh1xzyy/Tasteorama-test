const { until, By, Key } = require('selenium-webdriver')
const { slowType } = require('../utils/slowType')
const { sleep } = require('../utils/sleep')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')
const { SEARCH_LIST } = require('../constants/searchList')

const searchBar = async driver => {
	console.log('--------------- Search Bar Started ---------------')

	// Находим поле ввода
	const searchField = await driver.wait(
		until.elementLocated(By.css('div > form > input[type="text"]'))
	)
	await driver.wait(until.elementIsVisible(searchField), 5000)
	await scrollWindowToElement(driver, searchField, 1000)

	// Заполняем поле ввода разными значениями
	for (let char of SEARCH_LIST) {
		await slowType(driver, searchField, char, 200)
		await searchField.sendKeys(Key.RETURN)
		if (char === 'something' || '') {
			await sleep(driver, 2000)
			const resetSearchAndFilters = await driver.wait(
				until.elementLocated(
					By.xpath("//button[contains(text(), 'Reset search and filters')]")
				)
			)
			await driver.wait(until.elementIsVisible(resetSearchAndFilters), 5000)
			await scrollWindowToElement(driver, resetSearchAndFilters, 2000)
			await resetSearchAndFilters.click()
		}
		await sleep(driver, 2000)
	}

	console.log('--------------- Search Bar Ended ---------------')

	return { resetFilterLog: 'successfully' }
}

module.exports = { searchBar }
