const { until, By } = require('selenium-webdriver')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')
const {
	iterateRecipesAndUpdateFavorites,
} = require('../utils/iterateRecipesAndUpdateFavorites')
const { getMyProfileBtn } = require('../utils/getMyProfileBtn')

const mySavedRecipes = async driver => {
	console.log('--------------- My Saved Recipes Started ---------------')

	// Находим кнопку My Profile (в DOM и визуально) - прокручиваем стр. до кнопки - нажимаем
	const { myProfileBtn } = await getMyProfileBtn(driver)
	await scrollWindowToElement(driver, myProfileBtn, 1000)
	await myProfileBtn.click()

	// Находим кнопку Saved Recipes (в DOM и визуально) - прокручиваем стр. до кнопки - нажимаем
	const savedRecipes = await driver.wait(
		until.elementLocated(By.xpath('//a[contains(text(), "Saved Recipes")]'))
	)
	await driver.wait(until.elementIsVisible(savedRecipes), 5000)
	await scrollWindowToElement(driver, savedRecipes, 1000)
	await savedRecipes.click()

	// Находим рецепт из списка и сохраняем рецепт в избранные
	await iterateRecipesAndUpdateFavorites(
		driver,
		5,
		myProfileBtn,
		'savedRecipes'
	)

	// Логирование
	console.log('--------------- My Saved Recipes Ended ---------------')
	return { mySavedRecipesLog: 'successfully' }
}

module.exports = { mySavedRecipes }
