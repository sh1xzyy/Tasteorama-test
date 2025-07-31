const { Builder } = require('selenium-webdriver')
const { authorization } = require('./tests/authorization.js')
const { authentication } = require('./tests/authentication.js')
const { searchBar } = require('./tests/searchBar.js')
const { logout } = require('./tests/logout.js')
const { loadMore } = require('./tests/loadMore.js')
const { categorySelector } = require('./tests/categorySelector.js')
const { ingredientsSelector } = require('./tests/ingredientsSelector.js')
const { resetFilter } = require('./tests/resetFilter.js')
const { addRecipe } = require('./tests/addRecipe.js')
const { sleep } = require('./utils/sleep.js')
const { saveFavoriteRecipe } = require('./tests/saveFavoriteRecipe.js')
const { myRecipes } = require('./tests/myRecipes.js')
const { mySavedRecipes } = require('./tests/mySavedRecipes.js')

const { timePrettier } = require('./utils/timePrettier.js')

;(async function startTest() {
	let driver = await new Builder().forBrowser('chrome').build()
	const result = {}
	let startTime
	try {
		await driver.get('https://final-project-frontend-snowy.vercel.app/')
		console.log('--------------- Started ---------------')
		startTime = Date.now()

		// #Authorization
		// try {
		// 	const { authorizationLog } = await authorization(driver)
		// 	result.authorization = { status: 'success', log: authorizationLog }
		// } catch (error) {
		// 	console.error('Authentication FAILED:', error.message)
		// 	result.authorization = { status: 'failed', error: error.message }
		// }
		// await sleep(driver, 2000)

		// #Authentication
		try {
			const { authenticationLog } = await authentication(driver)
			result.authentication = { status: 'success', log: authenticationLog }
		} catch (error) {
			console.error('Authentication FAILED:', error.message)
			result.authentication = { status: 'failed', error: error.message }
		}
		await sleep(driver, 2000)

		// // #Category Selector
		// try {
		// 	const { categorySelectorLog } = await categorySelector(driver)
		// 	result.categorySelector = { status: 'success', log: categorySelectorLog }
		// } catch (error) {
		// 	console.error('Category Selector FAILED:', error.message)
		// 	result.categorySelector = { status: 'failed', error: error.message }
		// }
		// await sleep(driver, 2000)

		// // #Ingredients Selector
		// try {
		// 	const { ingredientsSelectorLog } = await ingredientsSelector(driver)
		// 	result.ingredientsSelector = {
		// 		status: 'success',
		// 		log: ingredientsSelectorLog,
		// 	}
		// } catch (error) {
		// 	console.error('Ingredients Selector FAILED:', error.message)
		// 	result.ingredientsSelector = { status: 'failed', error: error.message }
		// }
		// await sleep(driver, 2000)

		// #Reset Filter
		try {
			const { resetFilterLog } = await resetFilter(driver)
			result.resetFilter = { status: 'success', log: resetFilterLog }
		} catch (error) {
			console.error('Reset Filter FAILED:', error.message)
			result.resetFilter = { status: 'failed', error: error.message }
		}
		await sleep(driver, 2000)

		// #Search Bar
		try {
			const { searchBarLog } = await searchBar(driver)
			result.searchBar = {
				status: 'success',
				log: searchBarLog,
			}
		} catch (error) {
			console.error('Ingredients Selector FAILED:', error.message)
			result.searchBar = { status: 'failed', error: error.message }
		}
		await sleep(driver, 2000)

		// #Load More
		try {
			const { loadMoreLog } = await loadMore(driver)
			result.loadMore = {
				status: 'success',
				log: loadMoreLog,
			}
		} catch (error) {
			console.error('Ingredients Selector FAILED:', error.message)
			result.loadMore = { status: 'failed', error: error.message }
		}
		await sleep(driver, 2000)

		// #Save Recipe To Favorite
		try {
			const { saveFavoriteRecipeLog } = await saveFavoriteRecipe(driver)
			result.saveFavoriteRecipe = {
				status: 'success',
				log: saveFavoriteRecipeLog,
			}
		} catch (error) {
			console.error('Save Favorite Recipe FAILED:', error.message)
			result.saveFavoriteRecipe = { status: 'failed', error: error.message }
		}
		await sleep(driver, 2000)

		// #Add Recipe
		try {
			const { addRecipeLog } = await addRecipe(driver)
			result.addRecipe = {
				status: 'success',
				log: addRecipeLog,
			}
		} catch (error) {
			console.error('Add Recipe FAILED:', error.message)
			result.addRecipe = { status: 'failed', error: error.message }
		}
		await sleep(driver, 2000)

		// #My Recipes
		try {
			const { myRecipesLog } = await myRecipes(driver)
			result.myRecipes = {
				status: 'success',
				log: myRecipesLog,
			}
		} catch (error) {
			console.error('My Recipes FAILED:', error.message)
			result.myRecipes = { status: 'failed', error: error.message }
		}
		await sleep(driver, 2000)

		// #My Saved Recipes
		try {
			const { mySavedRecipesLog } = await mySavedRecipes(driver)
			result.mySavedRecipes = {
				status: 'success',
				log: mySavedRecipesLog,
			}
		} catch (error) {
			console.error('My Saved Recipes FAILED:', error.message)
			result.mySavedRecipes = { status: 'failed', error: error.message }
		}
		await sleep(driver, 2000)

		// #Logout

		try {
			const { logoutLog } = await logout(driver)
			result.logout = {
				status: 'success',
				log: logoutLog,
			}
		} catch (error) {
			console.error('Logout FAILED:', error.message)
			result.logout = { status: 'failed', error: error.message }
		}
		await sleep(driver, 2000)
	} catch (error) {
		console.log('--------------- Something went wrong:', error)
	} finally {
		console.log('--------------- End ---------------')
		result.time = timePrettier(Date.now() - startTime)
		console.log('FINAL RESULT:', result)
		await driver.sleep(5000)
		await driver.quit()
	}
})()
