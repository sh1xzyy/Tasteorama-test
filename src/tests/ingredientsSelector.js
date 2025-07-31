const { until, By, Key } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')
const { INGREDIENTS_LIST } = require('../constants/ingredientsList')
const { resetFilter } = require('./resetFilter')

const ingredientsSelector = async driver => {
	console.log('--------------- Ingredients Selector Started ---------------')

	// Находим селектор ингредиентов (в DOM и визуально)
	const ingredientSelector = await driver.wait(
		until.elementLocated(By.xpath('//span[contains(text(), "Ingredient")]'))
	)
	await driver.wait(until.elementIsVisible(ingredientSelector), 5000)
	await scrollWindowToElement(driver, categorySelector, 1000)

	// Проходимся по каждому ингредиенту - нажимаем на каждый
	for (let i = 0; i < INGREDIENTS_LIST.length; i++) {
		await ingredientSelector.click()
		await sleep(driver, 1000)

		const currentIngredientsItem = await driver.wait(
			until.elementLocated(
				By.xpath(`//li[contains(text(), "${INGREDIENTS_LIST[i]}")]`)
			)
		)
		await driver.wait(until.elementIsVisible(currentIngredientsItem))
		await sleep(driver, 1000)
		await currentIngredientsItem.click()
	}

	return { ingredientsSelectorLog: 'successfully' }
}

module.exports = { ingredientsSelector }
