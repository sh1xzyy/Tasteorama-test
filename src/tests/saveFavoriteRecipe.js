const { until, By } = require('selenium-webdriver')
const {
	iterateRecipesAndUpdateFavorites,
} = require('../utils/iterateRecipesAndUpdateFavorites')

const saveFavoriteRecipe = async driver => {
	console.log('--------------- Save Favorite Recipe Started ---------------')

	// Находим навигационную кнопку Recipes (в DOM и визуально)
	const recipesBtn = await driver.wait(
		until.elementLocated(By.css('nav > a[href="/"]'))
	)
	await driver.wait(until.elementIsVisible(recipesBtn), 5000)

	// Проходим по списку рецептов (добавляем и удаляем из избранного, включая проверку этих действий на странице доп. информации рецепта)
	await iterateRecipesAndUpdateFavorites(driver, 12, recipesBtn)

	console.log('--------------- Save Favorite Recipe Ended ---------------')

	return { resetFilterLog: 'successfully' }
}

module.exports = { saveFavoriteRecipe }
