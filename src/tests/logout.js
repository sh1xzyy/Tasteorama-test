const { until, By, Key } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')

const logout = async driver => {
	console.log('--------------- Logout Started ---------------')

	// Находим кнопку Logout и нажимаем
	const logoutBtn = await driver.wait(
		until.elementLocated(By.css('button[aria-label="Logout"]'))
	)
	await driver.wait(until.elementIsVisible(logoutBtn), 5000)
	await scrollWindowToElement(driver, logoutBtn, 1000)
	await logoutBtn.sendKeys(Key.RETURN)
	await sleep(driver, 1000)

	if (logoutBtn) {
		// Находим кнопку закрывающую модальное окно для подтверждения выхода пользователя
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
		await sleep(driver, 1000)

		// Находим кнопку отменяющую выход пользователя
		const cancelBtn = await driver.wait(
			until.elementLocated(By.xpath('//button[contains(text(), "Cancel")]'))
		)
		await driver.wait(until.elementIsVisible(cancelBtn), 5000)
		await cancelBtn.sendKeys(Key.RETURN)
		await sleep(driver, 1000)
		await logoutBtn.sendKeys(Key.RETURN)
		await sleep(driver, 1000)

		// Находим кнопку подтверждающую выход пользователя
		const logoutConfirmBtn = await driver.wait(
			until.elementLocated(By.xpath('//button[contains(text(), "Log out")]'))
		)
		await driver.wait(until.elementIsVisible(logoutConfirmBtn), 5000)
		await logoutConfirmBtn.sendKeys(Key.RETURN)
	}
}

module.exports = { logout }
