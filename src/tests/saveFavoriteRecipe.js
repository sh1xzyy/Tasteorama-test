const { until, By } = require('selenium-webdriver')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')
const { sleep } = require('../utils/sleep')

const saveFavoriteRecipe = async driver => {
	console.log('--------------- Save Favorite Recipe Started ---------------')

	// Находим рецепт из списка и сохраняем рецепт в избранные
	for (let i = 0; i < 10; i++) {
		// Находим рецепт и опускаем viewport к рецепту
		const currentItem = await driver.wait(
			until.elementLocated(By.css(`ul li:nth-child(${i + 1})`))
		)
		await driver.wait(until.elementIsVisible(currentItem), 5000)
		await scrollWindowToElement(driver, currentItem, 1000)

		// Находим кнопку Learn More в рецепте
		const learnMoreBtn = await currentItem.findElement(
			By.css('div div div > button')
		)
		await driver.wait(until.elementIsVisible(learnMoreBtn), 5000)

		// Находим кнопку добавления в избранное в рецепте и сохраняем рецепт в избранные
		const saveFavoriteBtn = await currentItem.findElement(
			By.css('button[aria-label="Toggle Favorite"]')
		)
		await driver.wait(until.elementIsVisible(saveFavoriteBtn), 5000)
		await saveFavoriteBtn.click()

		// Если рецепт является 5 рецептом в списке то переходим на страницу доп. информации о рецепте и удаляем его из избранных
		if (i === 5) {
			await sleep(driver, 1000)
			await learnMoreBtn.click()
			await sleep(driver, 1000)

			// Находим навигационную кнопку recipes и нажимаем
			const recipesBtn = await driver.wait(
				until.elementLocated(By.css('nav > a[href="/"]'))
			)
			await driver.wait(until.elementIsVisible(recipesBtn), 5000)

			// Находим кнопку Toggle Favorite и нажимаем
			const saveFavoriteOnLearMorePageBtn = await driver.wait(
				until.elementLocated(By.css('button[aria-label="Toggle Favorite"]'))
			)
			await driver.wait(
				until.elementIsVisible(saveFavoriteOnLearMorePageBtn),
				5000
			)
			await scrollWindowToElement(driver, saveFavoriteOnLearMorePageBtn, 2000)
			await saveFavoriteOnLearMorePageBtn.click()
			await sleep(driver, 2000)

			await scrollWindowToElement(driver, recipesBtn, 2000)
			await recipesBtn.click()
		}

		// Если рецепт является 4 и 7 рецептом в списке то удаляем его из списка избранных
		if (i === 4 || i === 7) {
			await sleep(driver, 1000)
			await saveFavoriteBtn.click()
		}
	}
}

module.exports = { saveFavoriteRecipe }
