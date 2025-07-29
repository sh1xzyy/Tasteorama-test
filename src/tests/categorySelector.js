const { until, By } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')
const { categoryList } = require('../constants/categoryList')

const categorySelector = async driver => {
	console.log('--------------- Category Selector Started ---------------')

	// Находим селектор категорий
	const categorySelector = await driver.wait(
		until.elementLocated(By.xpath('//span[contains(text(), "Category")]'))
	)
	await driver.wait(until.elementIsVisible(categorySelector), 5000)

	// Проходимся по каждой категории
	for (let i = 0; i <= categoryList.length; i++) {
		await categorySelector.click()
		await sleep(driver, 1000)

		const currentCategoryItem = await driver.wait(
			until.elementLocated(
				By.xpath(`//li[contains(text(), "${categoryList[i]}")]`)
			)
		)
		await driver.wait(until.elementIsVisible(currentCategoryItem))
		await sleep(driver, 1000)
		await currentCategoryItem.click()
	}
}

module.exports = { categorySelector }
