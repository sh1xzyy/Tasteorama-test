const { until, By, Key } = require('selenium-webdriver')
const { slowType } = require('../utils/slowType')
const { isAllFieldFilled } = require('../utils/isAllFieldFilled')

const authentication = async driver => {
	// Находим кнопку Login в DOM
	const loginBtn = await driver.wait(
		until.elementLocated(By.css('nav a[href="/auth/login"]'))
	)

	// Ждем пока кнопка отобразится на странице
	await driver.wait(until.elementIsVisible(loginBtn), 5000)

	await loginBtn.click()

	// Находим элементы Login в DOM
	const emailField = await driver.wait(
		until.elementLocated(By.css('input[name="email"]'))
	)
	const passwordField = await driver.wait(
		until.elementLocated(By.css('input[name="password"]'))
	)

	const submitBtn = await driver.wait(
		until.elementLocated(By.css('button[type="submit"]'))
	)

	// Ждем пока все элементы формы отобразятся на странице
	await driver.wait(until.elementIsVisible(emailField), 5000)
	await driver.wait(until.elementIsVisible(passwordField), 5000)
	await driver.wait(until.elementIsVisible(submitBtn), 5000)

	// Медленно заполняем содержимое полей ввода
	await slowType(driver, emailField, 'rajij31654@7tul.com')
	await slowType(driver, passwordField, 'asdA1f2^3aH!')

	// Проверка заполненности полей
	const isFieldsFill = await isAllFieldFilled({
		emailField,
		passwordField,
	})

	if (isFieldsFill) {
		await submitBtn.sendKeys(Key.RETURN)
	}
}

module.exports = { authentication }
