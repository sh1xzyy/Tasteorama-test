const { By, until, Key } = require('selenium-webdriver')

const { slowType } = require('../utils/slowType.js')

const authorization = async driver => {
	console.log('--------------- Authorization Started ---------------')

	// Находим кнопку Login (в DOM и визуально) - нажимаем

	const authorizationBtn = await driver.wait(
		until.elementLocated(By.css('nav a[href="/auth/register"]')),
		5000
	)
	await driver.wait(until.elementIsVisible(authorizationBtn), 5000)
	await authorizationBtn.click()

	// Ждем пока поля ввода появятся в DOM
	const nameField = await driver.wait(
		until.elementLocated(By.css('input[name="name"]')),
		5000
	)
	const emailField = await driver.wait(
		until.elementLocated(By.css('input[name="email"]')),
		5000
	)
	const passwordField = await driver.wait(
		until.elementLocated(By.css('input[name="password"]')),
		5000
	)
	const confirmPasswordField = await driver.wait(
		until.elementLocated(By.css('input[name="confirmPassword"]')),
		5000
	)
	const agreeField = await driver.wait(
		until.elementLocated(By.id('agreeToTerms')),
		5000
	)
	const submitBtn = await driver.wait(
		until.elementLocated(By.xpath('//button[contains(text(), "Register")]')),
		5000
	)

	// Ждем пока все элементы формы отобразятся на странице
	await driver.wait(until.elementIsVisible(nameField), 5000)
	await driver.wait(until.elementIsVisible(emailField), 5000)
	await driver.wait(until.elementIsVisible(passwordField), 5000)
	await driver.wait(until.elementIsVisible(confirmPasswordField), 5000)
	await driver.wait(until.elementIsVisible(agreeField), 5000)
	await driver.wait(until.elementIsVisible(submitBtn), 5000)

	// Медленно заполняем содержимое полей ввода
	await slowType(driver, nameField, 'Martha Pepperoni')
	await slowType(driver, emailField, 'rajij31654@7tul.com')
	await slowType(driver, passwordField, 'asdA1f2^3aH!')
	await slowType(driver, confirmPasswordField, 'asdA1f2^3aH!')

	// Проверка соглашения
	const isChecked = await agreeField.isSelected()

	if (!isChecked) {
		await agreeField.click()
	}

	// Отправляем форму
	await submitBtn.sendKeys(Key.RETURN)

	return { authorizationLog: 'successfully' }
}

module.exports = { authorization }
