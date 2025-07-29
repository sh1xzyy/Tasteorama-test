const { until, By, Key } = require('selenium-webdriver')
const { slowType } = require('../utils/slowType')
const { sleep } = require('../utils/sleep')
const { recipeIngredientList } = require('../constants/recipeIngredientList')
const {
	recipeIngredientsAmountList,
} = require('../constants/recipeIngredientsAmountList')
const path = require('path')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')
const {
	instructionsText,
	instructionsDescription,
} = require('../constants/addRecipeText')
const {
	deleteRecipeIngredients,
} = require('../constants/deleteRecipeIngredients')

const addRecipe = async driver => {
	console.log('--------------- Add Recipe Started ---------------')

	// Находим навигационную кнопку "Add Recipe" и кликаем по ней
	const addRecipeBtn = await driver.wait(
		until.elementLocated(By.css('nav a[href="/add-recipe"]'))
	)
	await driver.wait(until.elementIsVisible(addRecipeBtn), 5000)
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
	await slowType(driver, description, instructionsDescription)
	// #Cooking Time
	await slowType(driver, cookingTime, '45')

	// #Calories
	await slowType(driver, calories, '320')

	// #Categories
	await category.click()
	await sleep(driver, 1000)
	await categoryItem.click()

	// #Ingredients name and amount
	for (let i = 0; i < recipeIngredientList.length; i++) {
		// Ingredients name
		await sleep(driver, 1000)
		await ingredientsName.click()
		await sleep(driver, 1000)

		// Ingredients name list
		const ingredientsNameItem = await driver.wait(
			until.elementLocated(
				By.css(
					`select[name="ingredient"] option[value="${recipeIngredientList[i]}"]`
				)
			)
		)
		await driver.wait(until.elementIsVisible(ingredientsNameItem), 5000)
		await ingredientsNameItem.click()
		await sleep(driver, 1000)

		// Ingredients amount
		await slowType(driver, ingredientsAmount, recipeIngredientsAmountList[i])
		await sleep(driver, 1000)
		await addIngredient.click()
	}

	// #Delete some ingredients
	for (let i = 0; i < deleteRecipeIngredients.length; i++) {
		const deleteIngredientBtn = await driver.wait(
			until.elementLocated(
				By.xpath(`//li[contains(., "${deleteRecipeIngredients[i]}")]/button`)
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
	await slowType(driver, instructions, instructionsText)
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
}

module.exports = { addRecipe }
