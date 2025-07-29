const { until, By, Key } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')
const { ingredientsList } = require('../constants/ingredientsList')

const ingredientsSelector = async driver => {
	console.log('--------------- Ingredients Selector Started ---------------')

	// Находим селектор ингредиентов
	const ingredientSelector = await driver.wait(
		until.elementLocated(By.xpath('//span[contains(text(), "Ingredient")]'))
	)
	await driver.wait(until.elementIsVisible(ingredientSelector), 5000)

	// Проходимся по каждому ингредиенту
	for (let i = 0; i <= ingredientsList.length; i++) {
		await ingredientSelector.click()
		await sleep(driver, 1000)

		const currentIngredientsItem = await driver.wait(
			until.elementLocated(
				By.xpath(`//li[contains(text(), "${ingredientsList[i]}")]`)
			)
		)
		await driver.wait(until.elementIsVisible(currentIngredientsItem))
		await sleep(driver, 1000)
		await currentIngredientsItem.click()
	}
}

module.exports = { ingredientsSelector }
