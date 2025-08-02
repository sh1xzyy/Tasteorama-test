const { checkDetailFavoriteRecipe } = require('./checkDetailFavoriteRecipe')
const { clickButtonInRecipe } = require('./clickButtonInRecipe')
const { sleep } = require('./sleep')

const iterateRecipesAndUpdateFavorites = async (
	driver,
	maxIterate,
	primaryNavLink,
	nestedNavLink = null
) => {
	for (let i = 0; i < maxIterate; i++) {
		// Если рецепт является 2 или 4 рецептом в списке то переходим на страницу доп. информации о рецепте и удаляем его из избранных
		if (i === 2 || i === 4) {
			await clickButtonInRecipe(driver, i, 'div div div > button')
			await checkDetailFavoriteRecipe(driver, primaryNavLink, nestedNavLink)
		}
		// Если рецепт является 3 рецептом в списке то удаляем его из списка избранных
		else if (nestedNavLink !== 'savedRecipes' && i === 3) {
			const { saveFavoriteBtn } = await clickButtonInRecipe(
				driver,
				i,
				'button[aria-label="Toggle Favorite"]'
			)
			await sleep(driver, 2000)
			await saveFavoriteBtn.click()
		}
		// Если ничего не подошло то просто добавляем или удаляем из избранного
		else {
			await clickButtonInRecipe(
				driver,
				i,
				'button[aria-label="Toggle Favorite"]'
			)
		}
	}
}

module.exports = { iterateRecipesAndUpdateFavorites }
