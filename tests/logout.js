const { until, By, Key } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')

const logout = async driver => {
	// Ждем пока кнопка не появится в DOM
	const logoutBtn = await driver.wait(
		until.elementLocated(By.css('button[aria-label="Logout"]'))
	)

	await driver.wait(until.elementIsVisible(logoutBtn), 5000)

	await logoutBtn.sendKeys(Key.RETURN)

	await sleep(driver, 2000)

	// Ждем пока кнопка выхода появится в DOM
	const logoutSubmitBtn = await driver.wait(
		until.elementLocated(By.xpath('//button[contains(text(), "Log out")]'))
	)

	await driver.wait(until.elementIsVisible(logoutSubmitBtn), 5000)
	await logoutSubmitBtn.sendKeys(Key.RETURN)
}

module.exports = { logout }
