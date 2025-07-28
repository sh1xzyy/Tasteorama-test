const { until, By, Key } = require('selenium-webdriver')
const { sleep } = require('../utils/sleep')
const { scrollWindowToElement } = require('../utils/scrollWindowToElement')

const loadMore = async driver => {
	const loadMoreBtn = await driver.wait(
		until.elementLocated(By.xpath('//button[contains(text(), "Load More")]'))
	)
	await driver.wait(until.elementIsVisible(loadMoreBtn), 5000)
	await scrollWindowToElement(driver, loadMoreBtn)

	await sleep(driver, 1000)
	await loadMoreBtn.sendKeys(Key.RETURN)

	await sleep(driver, 1000)
	await scrollWindowToElement(driver, loadMoreBtn)

	await sleep(driver, 1000)
	await loadMoreBtn.sendKeys(Key.RETURN)

	await sleep(driver, 1000)
	await scrollWindowToElement(driver, loadMoreBtn)

	await sleep(driver, 1000)
}

module.exports = { loadMore }
