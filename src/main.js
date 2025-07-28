const { Builder } = require('selenium-webdriver')
const { authorization } = require('./tests/authorization.js')
const { authentication } = require('./tests/authentication.js')
const { searchBar } = require('./tests/searchBar.js')
const { logout } = require('./tests/logout.js')
const { loadMore } = require('./tests/loadMore.js')
const { categorySelector } = require('./tests/categorySelector.js')
const { ingredientsSelector } = require('./tests/ingredientsSelector.js')
const { resetFilter } = require('./tests/resetFilter.js')
;(async function startTest() {
	let driver = await new Builder().forBrowser('chrome').build()
	try {
		await driver.get('https://final-project-frontend-snowy.vercel.app/')
		console.log('Started')

		// await authorization(driver)
		await authentication(driver)
		await categorySelector(driver)
		// await ingredientsSelector(driver)
		await resetFilter(driver)
		await searchBar(driver)
		await loadMore(driver)
		await logout(driver)
	} catch (error) {
		console.log('Something went wrong:', error)
	} finally {
		await driver.sleep(5000)
		await driver.quit()
	}
})()
