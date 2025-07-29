const { sleep } = require('./sleep')

// Прокручиваем страницу к элементу и после прокрутки небольшая задержка
const scrollWindowToElement = async (driver, element, sleepTime = 1000) => {
	await driver.executeScript('arguments[0].scrollIntoView(true)', element)
	await sleep(driver, sleepTime)
}

module.exports = { scrollWindowToElement }
