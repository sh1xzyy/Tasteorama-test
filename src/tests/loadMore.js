const { until, By, Key } = require('selenium-webdriver')
const { scrollWindowToBottom } = require('../utils/scrollWindowToBottom')
const { sleep } = require('../utils/sleep')

const loadMore = async driver => {
	await scrollWindowToBottom(driver)

	const loadMoreBtn = await driver.wait(
		until.elementLocated(By.xpath('//button[contains(text(), "Load More")]'))
	)

	await driver.wait(until.elementIsVisible(loadMoreBtn), 5000)

	await sleep(driver, 1000)

	await loadMoreBtn.sendKeys(Key.RETURN)

	await sleep(driver, 1000)

	await scrollWindowToBottom(driver)

	await sleep(driver, 1000)

	await loadMoreBtn.sendKeys(Key.RETURN)

	await sleep(driver, 1000)

	await scrollWindowToBottom(driver)

	await sleep(driver, 1000)
}

module.exports = { loadMore }
