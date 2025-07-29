const { until, By, Key } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')

const loadMore = async driver => {
	// Находим кнопку Load More
	const loadMoreBtn = await driver.wait(
		until.elementLocated(By.xpath('//button[contains(text(), "Load More")]'))
	)
	await driver.wait(until.elementIsVisible(loadMoreBtn), 5000)

	// Прокручиваем страницу к кнопке и нажимаем на нее 2 раза
	for (let i = 0; i < 2; i++) {
		await scrollWindowToElement(driver, loadMoreBtn, 1000)
		await loadMoreBtn.sendKeys(Key.RETURN)
		await sleep(driver, 1000)
	}
}

module.exports = { loadMore }
