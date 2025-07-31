const { By, until } = require('selenium-webdriver')

const getMyProfileBtn = async driver => {
	const myProfileBtn = await driver.wait(
		until.elementLocated(By.css('nav a[href="/profile/own"]')),
		5000
	)
	await driver.wait(until.elementIsVisible(myProfileBtn), 5000)

	return { myProfileBtn }
}

module.exports = { getMyProfileBtn }
