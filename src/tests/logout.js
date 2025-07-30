const { until, By, Key } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')
const { openLogoutModal } = require('../utils/openLogoutModal')

const logout = async driver => {
	console.log('--------------- Logout Started ---------------')

	// Находим кнопку Logout (в DOM и визуально) - прокручиваем стр. до кнопки - нажимаем
	const logoutBtn = await driver.wait(
		until.elementLocated(By.css('button[aria-label="Logout"]'))
	)
	await driver.wait(until.elementIsVisible(logoutBtn), 5000)
	await scrollWindowToElement(driver, logoutBtn, 1000)
	await openLogoutModal(driver, logoutBtn)

	// Если кнопка открываю модальное окно для выхода пользователя открыта ищем следующие элементы модального окна
	if (logoutBtn) {
		// Находим кнопку закрывающую модальное окно
		const closeBtn = await driver.wait(
			until.elementLocated(By.xpath('//div[contains(@class,"modal")]/button'))
		)
		await driver.wait(until.elementIsVisible(closeBtn), 5000)
		await closeBtn.click()
		await sleep(driver, 1000)

		// Открываем модальное окно и находим кнопку отменяющую выход пользователя
		await openLogoutModal(driver, logoutBtn)
		const cancelBtn = await driver.wait(
			until.elementLocated(By.xpath('//button[contains(text(), "Cancel")]'))
		)
		await driver.wait(until.elementIsVisible(cancelBtn), 5000)
		await cancelBtn.sendKeys(Key.RETURN)
		await sleep(driver, 1000)

		// Открываем модальное окно и находим кнопку подтверждающую выход пользователя
		await openLogoutModal(driver, logoutBtn)
		const logoutConfirmBtn = await driver.wait(
			until.elementLocated(By.xpath('//button[contains(text(), "Log out")]'))
		)
		await driver.wait(until.elementIsVisible(logoutConfirmBtn), 5000)
		await logoutConfirmBtn.sendKeys(Key.RETURN)
	}

	console.log('--------------- Logout Ended ---------------')

	return { logoutLog: 'successfully' }
}

module.exports = { logout }
