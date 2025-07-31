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
		// Если рецепт является 2 или 4 рецептом в списке то переходим на страницу доп. информации о рецепте и удаляем его из избранных
		if (i === 2 || i === 4) {
			// Переопределяем learnMoreBtn, т.к. рецепт мог устареть
			const { currentItem } = await getCurrentItem(driver, i)
			await scrollWindowToElement(driver, currentItem, 1000)

			// Находим кнопку Learn More в рецепте
			const learnMoreBtn = await currentItem.findElement(
				By.css('div div div > button')
			)
			await driver.wait(until.elementIsVisible(learnMoreBtn), 5000)
			await learnMoreBtn.click()
			await checkDetailFavoriteRecipe(driver, primaryNavLink, nestedNavLink)
		}
		// Если рецепт является 3 рецептом в списке то удаляем его из списка избранных
		else if (i === 3) {
			await sleep(driver, 1000)
			// Переопределяем learnMoreBtn, т.к. рецепт мог устареть
			const { currentItem } = await getCurrentItem(driver, i)
			await scrollWindowToElement(driver, currentItem, 1000)

			// Находим кнопку добавления в избранное в рецепте и сохраняем рецепт в избранные
			const saveFavoriteBtn = await currentItem.findElement(
				By.css('button[aria-label="Toggle Favorite"]')
			)
			await driver.wait(until.elementIsVisible(saveFavoriteBtn), 5000)
			await saveFavoriteBtn.click()
		}
		// Если ничего не подошло то просто добавляем или удаляем из избранного
		else {
			// Находим рецепт и опускаем viewport к рецепту
			const { currentItem } = await getCurrentItem(driver, i)
			await scrollWindowToElement(driver, currentItem, 1000)

			// Находим кнопку добавления в избранное в рецепте и сохраняем рецепт в избранные
			const saveFavoriteBtn = await currentItem.findElement(
				By.css('button[aria-label="Toggle Favorite"]')
			)
			await driver.wait(until.elementIsVisible(saveFavoriteBtn), 5000)
			await saveFavoriteBtn.click()
			await sleep(driver, 1000)
		}
	}
}

module.exports = { iterateRecipesAndUpdateFavorites }
