const { until, By } = require('selenium-webdriver')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')
const {
	iterateRecipesAndUpdateFavorites,
} = require('../utils/iterateRecipesAndUpdateFavorites')

const myRecipes = async driver => {
	console.log('--------------- My Recipes Started ---------------')

	// Находим кнопку My Profile (в DOM и визуально) - прокручиваем стр. до кнопки - нажимаем
	const myProfileBtn = await driver.wait(
		until.elementLocated(By.css('nav a[href="/profile/own"]'))
	)
	await driver.wait(until.elementIsVisible(myProfileBtn), 5000)
	await scrollWindowToElement(driver, myProfileBtn, 1000)
	await myProfileBtn.click()

	// Находим кнопку My Recipes (в DOM и визуально) - прокручиваем стр. до кнопки - нажимаем
	const myRecipesBtn = await driver.wait(
		until.elementLocated(By.xpath('//a[contains(text(), "My Recipes")]'))
	)
	await driver.wait(until.elementIsVisible(myRecipesBtn), 5000)
	await scrollWindowToElement(driver, myRecipesBtn, 1000)
	await myRecipesBtn.click()

	// Находим рецепт из списка и сохраняем рецепт в избранное
	await iterateRecipesAndUpdateFavorites(
		driver,
		5,
		myProfileBtn,
		'myRecipesBtn'
	)

	console.log('--------------- My Recipes Ended ---------------')

	return { myRecipesLog: 'successfully' }
}

module.exports = { myRecipes }
