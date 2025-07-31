const { until, By } = require('selenium-webdriver')
const { scrollWindowToElement } = require('./scrollWindowToElement')
const { sleep } = require('./sleep')
const { checkDetailFavoriteRecipe } = require('./checkDetailFavoriteRecipe')
const { getCurrentItem } = require('./getCurrentItem')

const iterateRecipesAndUpdateFavorites = async (
	driver,
	maxIterate,
	primaryNavLink,
	nestedNavLink = null
) => {
	for (let i = 0; i < maxIterate; i++) {
		// Находим рецепт и опускаем viewport к рецепту
		const { currentItem } = await getCurrentItem(driver, i)
		await scrollWindowToElement(driver, currentItem, 1000)

		// Если рецепт является 2 или 4 рецептом в списке то переходим на страницу доп. информации о рецепте и удаляем его из избранных
		if (i === 2 || i === 4) {
			console.log('2 0r 4')

			// Переопределяем learnMoreBtn, т.к. рецепт мог устареть
			const { currentItem } = await getCurrentItem(driver, i)

			console.log('2 0r 5')

			// Находим кнопку Learn More в рецепте
			const learnMoreBtn = await currentItem.findElement(
				By.css('div div div > button')
			)
			await driver.wait(until.elementIsVisible(learnMoreBtn), 5000)
			console.log('2 0r 6')

			await learnMoreBtn.click()
			console.log('2 0r 7')

			await checkDetailFavoriteRecipe(driver, primaryNavLink, nestedNavLink)
			console.log('2 0r 8')
		}

		// Если рецепт является 3 рецептом в списке то удаляем его из списка избранных
		if (i === 3) {
			await sleep(driver, 1000)

			// Переопределяем learnMoreBtn, т.к. рецепт мог устареть
			const { currentItem } = await getCurrentItem(driver, i)

			// Находим кнопку добавления в избранное в рецепте и сохраняем рецепт в избранные
			const saveFavoriteBtn = await currentItem.findElement(
				By.css('button[aria-label="Toggle Favorite"]')
			)
			await driver.wait(until.elementIsVisible(saveFavoriteBtn), 5000)
			await saveFavoriteBtn.click()
		}

		// Находим кнопку добавления в избранное в рецепте и сохраняем рецепт в избранные
		const saveFavoriteBtn = await currentItem.findElement(
			By.css('button[aria-label="Toggle Favorite"]')
		)
		await driver.wait(until.elementIsVisible(saveFavoriteBtn), 5000)
		await saveFavoriteBtn.click()
		await sleep(driver, 1000)
	}
}

module.exports = { iterateRecipesAndUpdateFavorites }
