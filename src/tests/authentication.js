const { until, By, Key } = require('selenium-webdriver')
const { slowType } = require('../utils/slowType')

const authentication = async driver => {
	console.log('--------------- Authentication Started ---------------')

	// Находим кнопку Login (в DOM и визуально) - нажимаем
	const loginBtn = await driver.wait(
		until.elementLocated(By.css('nav a[href="/auth/login"]'))
	)
	await driver.wait(until.elementIsVisible(loginBtn), 5000)
	await loginBtn.click()

	// Находим элементы формы Login в DOM
	const emailField = await driver.wait(
		until.elementLocated(By.css('input[name="email"]'))
	)
	const passwordField = await driver.wait(
		until.elementLocated(By.css('input[name="password"]'))
	)
	const submitBtn = await driver.wait(
		until.elementLocated(By.xpath('//button[contains(text(), "Log In")]'))
	)

	// Ждем пока все элементы формы отобразятся на странице
	await driver.wait(until.elementIsVisible(emailField), 5000)
	await driver.wait(until.elementIsVisible(passwordField), 5000)
	await driver.wait(until.elementIsVisible(submitBtn), 5000)

	// Медленно заполняем содержимое полей ввода
	await slowType(driver, emailField, 'rajij31654@7tul.com')
	await slowType(driver, passwordField, 'asdA1f2^3aH!')

	// Отправляем форму
	await submitBtn.sendKeys(Key.RETURN)

	console.log('--------------- Authentication Ended ---------------')

	return { authenticationLog: 'successfully' }
}

module.exports = { authentication }
