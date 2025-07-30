const { until, By, Key } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')

const loadMore = async driver => {
	console.log('--------------- Load More Started ---------------')

	// Находим кнопку Load More (в DOM и визуально)
	const loadMoreBtn = await driver.wait(
		until.elementLocated(By.xpath('//button[contains(text(), "Load More")]'))
	)
	await driver.wait(until.elementIsVisible(loadMoreBtn), 5000)

	// Прокручиваем страницу к кнопке и нажимаем на нее 2 раза
	for (let i = 0; i < 3; i++) {
		await scrollWindowToElement(driver, loadMoreBtn, 1000)
		await loadMoreBtn.sendKeys(Key.RETURN)
		await scrollWindowToElement(driver, loadMoreBtn, 1000)
		await sleep(driver, 1000)
	}

	return { loadMoreLog: 'successfully' }
}

module.exports = { loadMore }
