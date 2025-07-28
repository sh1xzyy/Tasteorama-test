const { until, By, Key } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')

const logout = async driver => {
	// Ожидание и клик по кнопке Logout
	const logoutBtn = await driver.wait(
		until.elementLocated(By.css('button[aria-label="Logout"]'))
	)
	await driver.wait(until.elementIsVisible(logoutBtn), 5000)
	await logoutBtn.sendKeys(Key.RETURN)
	await sleep(driver, 1000)

	// Ожидание и клик по кнопке выйти из окна выхода пользователя
	const closeBtn = await driver.wait(
		until.elementLocated(
			By.css(
				'button > svg > use[href="/assets/sprite-CJlgzE18.svg#icon-close"]'
			)
		)
	)
	await driver.wait(until.elementIsVisible(closeBtn), 5000)
	await closeBtn.click()
	await sleep(driver, 1000)
	await logoutBtn.sendKeys(Key.RETURN)

	// Ожидание и клик по кнопке отмена для окна выхода пользователя
	await sleep(driver, 1000)
	const cancelBtn = await driver.wait(
		until.elementLocated(By.xpath('//button[contains(text(), "Cancel")]'))
	)
	await driver.wait(until.elementIsVisible(cancelBtn), 5000)
	await cancelBtn.sendKeys(Key.RETURN)
	await sleep(driver, 1000)
	await logoutBtn.sendKeys(Key.RETURN)

	// Ожидание и клик по кнопке подтверждающее выход пользователя
	await sleep(driver, 1000)
	const logoutConfirmBtn = await driver.wait(
		until.elementLocated(By.xpath('//button[contains(text(), "Log out")]'))
	)
	await driver.wait(until.elementIsVisible(logoutConfirmBtn), 5000)
	await logoutConfirmBtn.sendKeys(Key.RETURN)
}

module.exports = { logout }
