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
;(async function startTest() {
	let driver = await new Builder().forBrowser('chrome').build()
	try {
		await driver.get('https://final-project-frontend-snowy.vercel.app/')
		console.log('--------------- Started ---------------')

		// #Authorization
		// await authorization(driver)
		// await sleep(driver, 2000)

		// #Authentication
		await authentication(driver)
		await sleep(driver, 2000)

		// #Category Selector
		// await categorySelector(driver)
		// await sleep(driver, 2000)

		// #Ingredients Selector
		// await ingredientsSelector(driver)
		// await sleep(driver, 2000)

		// #Reset Filter
		await resetFilter(driver)
		await sleep(driver, 2000)

		// #Search Bar
		await searchBar(driver)
		await sleep(driver, 2000)

		// #Load More
		await loadMore(driver)
		await sleep(driver, 2000)

		// #Save Recipe To Favorite
		await saveFavoriteRecipe(driver)
		await sleep(driver, 2000)

		// #Add Recipe
		await addRecipe(driver)
		await sleep(driver, 2000)

		// #Logout
		await logout(driver)
		await sleep(driver, 2000)
	} catch (error) {
		console.log('--------------- Something went wrong:', error)
	} finally {
		console.log('--------------- End ---------------')
		await driver.sleep(5000)
		await driver.quit()
	}
})()
