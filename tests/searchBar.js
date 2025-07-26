const { until, By, Key } = require('selenium-webdriver')
const { slowType } = require('../utils/slowType')

const searchBar = async driver => {
	const searchField = await driver.wait(
		until.elementLocated(By.css('div > form > input[type="text"]'))
	)

	await driver.wait(until.elementIsVisible(searchField), 5000)

	await slowType(driver, searchField, 'potato')
	await searchField.sendKeys(Key.RETURN)
	await driver.sleep(2000)
	await slowType(driver, searchField, 'something')
	await searchField.sendKeys(Key.RETURN)
	await driver.sleep(2000)
	await slowType(driver, searchField, 'potato')
	await searchField.sendKeys(Key.RETURN)
	await driver.sleep(2000)
	await slowType(driver, searchField, '')
	await searchField.sendKeys(Key.RETURN)
	await driver.sleep(2000)
}

module.exports = { searchBar }
