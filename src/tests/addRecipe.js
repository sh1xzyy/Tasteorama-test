const { until, By, Key } = require('selenium-webdriver')
const { slowType } = require('../utils/slowType')
const { sleep } = require('../utils/sleep')
const { RECIPE_INGREDIENTS_LIST } = require('../constants/recipeIngredientList')
const {
	RECIPE_INGREDIENTS_AMOUNT_LIST,
} = require('../constants/recipeIngredientsAmountList')
const path = require('path')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')
const {
	INSTRUCTIONS_TEXT,
	INSTRUCTIONS_DESC,
} = require('../constants/addRecipeText')
const {
	DELETE_INGREDIENTS_LIST,
} = require('../constants/deleteRecipeIngredients')

const addRecipe = async driver => {
	console.log('--------------- Add Recipe Started ---------------')

	// Находим навигационную кнопку "Add Recipe" и кликаем по ней
	const addRecipeBtn = await driver.wait(
		until.elementLocated(By.css('nav a[href="/add-recipe"]'))
	)
	await driver.wait(until.elementIsVisible(addRecipeBtn), 5000)
	await scrollWindowToElement(driver, addRecipeBtn, 1000)
	await addRecipeBtn.click()

	// Находим все элементы формы в DOM
	const title = await driver.wait(
		until.elementLocated(By.css('input[name="title"]'))
	)
	const description = await driver.wait(
		until.elementLocated(By.css('textarea[name="description"]'))
	)
	const cookingTime = await driver.wait(
		until.elementLocated(By.css('input[name="time"]'))
	)
	const calories = await driver.wait(
		until.elementLocated(By.css('input[name="calories"]'))
	)
	const category = await driver.wait(
		until.elementLocated(By.css('select[name="category"]'))
	)
	const categoryItem = await driver.wait(
		until.elementLocated(
			By.css('select[name="category"] option[value="Chicken"]')
		)
	)
	const ingredientsName = await driver.wait(
		until.elementLocated(By.css('select[name="ingredient"]'))
	)
	const ingredientsAmount = await driver.wait(
		until.elementLocated(By.css('input[name="amount"]'))
	)
	const addIngredient = await driver.wait(
		until.elementLocated(
			By.xpath('//button[contains(text(), "Add new Ingredient")]')
		)
	)
	const instructions = await driver.wait(
		until.elementLocated(By.css('textarea[name="instructions"]'))
	)
	const thumb = await driver.wait(
		until.elementLocated(By.css('input[name="thumb"]'))
	)
	const submitBtn = await driver.wait(
		until.elementLocated(
			By.xpath('//button[contains(text(), "Publish Recipe")]')
		)
	)

	// Ждем пока все элементы формы отобразятся на странице
	await driver.wait(until.elementIsVisible(title), 5000)
	await driver.wait(until.elementIsVisible(description), 5000)
	await driver.wait(until.elementIsVisible(cookingTime), 5000)
	await driver.wait(until.elementIsVisible(calories), 5000)
	await driver.wait(until.elementIsVisible(category), 5000)
	await driver.wait(until.elementIsVisible(categoryItem), 5000)
	await driver.wait(until.elementIsVisible(ingredientsName), 5000)
	await driver.wait(until.elementIsVisible(ingredientsAmount), 5000)
	await driver.wait(until.elementIsVisible(addIngredient), 5000)
	await driver.wait(until.elementIsVisible(instructions), 5000)
	await driver.wait(until.elementIsVisible(submitBtn), 5000)

	// Заполняем поля

	// #Title
	await slowType(driver, title, 'Chicken in Creamy Mushroom Sauce')
	await scrollWindowToElement(driver, ingredientsName)

	// #Description
	await slowType(driver, description, INSTRUCTIONS_DESC)
	// #Cooking Time
	await slowType(driver, cookingTime, '45')

	// #Calories
	await slowType(driver, calories, '320')

	// #Categories
	await category.click()
	await sleep(driver, 1000)
	await categoryItem.click()

	// #Ingredients name and amount
	for (let i = 0; i < RECIPE_INGREDIENTS_LIST.length; i++) {
		// Ingredients name
		await sleep(driver, 1000)
		await ingredientsName.click()
		await sleep(driver, 1000)

		// Ingredients name list
		const ingredientsNameItem = await driver.wait(
			until.elementLocated(
				By.css(
					`select[name="ingredient"] option[value="${RECIPE_INGREDIENTS_LIST[i]}"]`
				)
			)
		)
		await driver.wait(until.elementIsVisible(ingredientsNameItem), 5000)
		await ingredientsNameItem.click()
		await sleep(driver, 1000)

		// Ingredients amount
		await slowType(driver, ingredientsAmount, RECIPE_INGREDIENTS_AMOUNT_LIST[i])
		await sleep(driver, 1000)
		await addIngredient.click()
	}

	// #Delete some ingredients
	for (let i = 0; i < DELETE_INGREDIENTS_LIST.length; i++) {
		const deleteIngredientBtn = await driver.wait(
			until.elementLocated(
				By.xpath(`//li[contains(., "${DELETE_INGREDIENTS_LIST[i]}")]/button`)
			)
		)
		await driver.wait(until.elementIsVisible(deleteIngredientBtn), 5000)
		await scrollWindowToElement(driver, deleteIngredientBtn)
		await sleep(driver, 1000)
		await deleteIngredientBtn.click()
		await sleep(driver, 1000)
	}

	// #Instructions
	await scrollWindowToElement(driver, instructions)
	await slowType(driver, instructions, INSTRUCTIONS_TEXT)
	await sleep(driver, 1000)
	await scrollWindowToElement(driver, thumb)
	await sleep(driver, 1000)

	// #Set thumb of recipe
	const filePath = path.resolve(
		__dirname,
		'../img/creamy-white-wine-chicken-5.jpg'
	)

	await thumb.sendKeys(filePath)
	await sleep(driver, 1000)

	// #Send form
	await scrollWindowToElement(driver, submitBtn)
	await sleep(driver, 1000)
	await submitBtn.sendKeys(Key.RETURN)

	console.log('--------------- Add Recipe Ended ---------------')

	return { addRecipeLog: 'successfully' }
}

module.exports = { addRecipe }
