const { until, By } = require('selenium-webdriver')
const { scrollWindowToElement } = require('./scrollWindowToElement')
const { sleep } = require('./sleep')

const clickButtonInRecipe = async (driver, i, buttonSelector) => {
	try {
		await sleep(driver, 1000)
		// Находим текущий элемент (в DOM и визуально) - нажимаем не него
		const currentItem = await driver.wait(
			until.elementLocated(By.css(`ul li:nth-child(${i + 1})`)),
			5000
		)
		await driver.wait(until.elementIsVisible(currentItem), 5000)
		await scrollWindowToElement(driver, currentItem, 1000)

		// Находим кнопку добавления в избранное в рецепте и сохраняем рецепт в избранные
		const saveFavoriteBtn = await currentItem.findElement(
			By.css(buttonSelector)
		)
		await driver.wait(until.elementIsVisible(saveFavoriteBtn), 5000)
		await saveFavoriteBtn.click()

		return { saveFavoriteBtn }
	} catch (error) {
		throw new Error(
			`The element does not exist at index ${i} with selector ${buttonSelector}: ${error.message} `
		)
	}
}

module.exports = { clickButtonInRecipe }
