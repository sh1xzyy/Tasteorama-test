const { until, By } = require('selenium-webdriver')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')
const {
	iterateRecipesAndUpdateFavorites,
} = require('../utils/iterateRecipesAndUpdateFavorites')
const { getMyProfileBtn } = require('../utils/getMyProfileBtn')

const myRecipes = async driver => {
	console.log('--------------- My Recipes Started ---------------')

	// Находим кнопку My Profile (в DOM и визуально) - прокручиваем стр. до кнопки - нажимаем
	const { myProfileBtn } = await getMyProfileBtn(driver)
	await scrollWindowToElement(driver, myProfileBtn, 1000)
	await myProfileBtn.click()

	// Находим кнопку My Recipes (в DOM и визуально) - прокручиваем стр. до кнопки - нажимаем
	const myRecipesBtn = await driver.wait(
		until.elementLocated(By.xpath('//a[contains(text(), "My Recipes")]')),
		5000
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

	// Логирование
	console.log('--------------- My Recipes Ended ---------------')
	return { myRecipesLog: 'successfully' }
}

module.exports = { myRecipes }
