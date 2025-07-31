const { until, By } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')
const { CATEGORY_LIST } = require('../constants/categoryList')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')
const { resetFilter } = require('./resetFilter')

const categorySelector = async driver => {
	console.log('--------------- Category Selector Started ---------------')

	// Находим селектор категорий (в DOM и визуально)
	const categorySelector = await driver.wait(
		until.elementLocated(By.xpath('//span[contains(text(), "Category")]'))
	)
	await driver.wait(until.elementIsVisible(categorySelector), 5000)
	await scrollWindowToElement(driver, categorySelector, 1000)

	// Проходимся по каждой категории - нажимаем на каждую
	for (let i = 0; i < CATEGORY_LIST.length; i++) {
		await categorySelector.click()
		await sleep(driver, 1000)

		const currentCategoryItem = await driver.wait(
			until.elementLocated(
				By.xpath(`//li[contains(text(), "${CATEGORY_LIST[i]}")]`)
			)
		)
		await driver.wait(until.elementIsVisible(currentCategoryItem))
		await sleep(driver, 1000)
		await currentCategoryItem.click()
	}

	return { categorySelectorLog: 'successfully' }
}

module.exports = { categorySelector }
