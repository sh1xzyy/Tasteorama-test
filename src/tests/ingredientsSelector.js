const { until, By } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')
const { INGREDIENTS_LIST } = require('../constants/ingredientsList')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')

const ingredientsSelector = async driver => {
	console.log('--------------- Ingredients Selector Started ---------------')

	// Находим селектор ингредиентов (в DOM и визуально)
	const ingredientSelector = await driver.wait(
		until.elementLocated(By.xpath('//span[contains(text(), "Ingredient")]')),
		5000
	)
	await driver.wait(until.elementIsVisible(ingredientSelector), 5000)
	await scrollWindowToElement(driver, ingredientSelector, 1000)

	// Проходимся по каждому ингредиенту - нажимаем на каждый
	for (let i = 0; i < INGREDIENTS_LIST.length; i++) {
		await ingredientSelector.click()
		await sleep(driver, 1000)

		const currentIngredientsItem = await driver.wait(
			until.elementLocated(
				By.xpath(`//li[contains(text(), "${INGREDIENTS_LIST[i]}")]`)
			),
			5000
		)
		await driver.wait(until.elementIsVisible(currentIngredientsItem), 5000)
		await scrollWindowToElement(driver, ingredientSelector, 1000)
		await sleep(driver, 1000)
		await currentIngredientsItem.click()
	}

	// Логирование
	console.log('--------------- Ingredients Selector Ended ---------------')
	return { ingredientsSelectorLog: 'successfully' }
}

module.exports = { ingredientsSelector }
