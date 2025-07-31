const { until, By, Key } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')

const loadMore = async (driver, iterations = 1) => {
	console.log('--------------- Load More Started ---------------')

	try {
		// Находим кнопку Load More (в DOM и визуально)
		const loadMoreBtn = await driver.wait(
			until.elementLocated(By.xpath('//button[contains(text(), "Load More")]')),
			5000
		)
		await driver.wait(until.elementIsVisible(loadMoreBtn), 5000)

		// Прокручиваем страницу к кнопке и нажимаем на нее { iterations } раз
		for (let i = 0; i < iterations; i++) {
			await scrollWindowToElement(driver, loadMoreBtn, 1000)
			await loadMoreBtn.sendKeys(Key.RETURN)
			await scrollWindowToElement(driver, loadMoreBtn, 1000)
			await sleep(driver, 1000)
		}
	} catch (error) {
		throw new Error('Load More button not found')
	}

	// Логирование
	console.log('--------------- Load More Ended ---------------')
	return { loadMoreLog: 'successfully' }
}

module.exports = { loadMore }
