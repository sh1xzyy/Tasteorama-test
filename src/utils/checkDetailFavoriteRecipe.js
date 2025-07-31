const { By, until } = require('selenium-webdriver')
const { sleep } = require('./sleep')
const { scrollWindowToElement } = require('./scrollWindowToElement')

const checkDetailFavoriteRecipe = async (
	driver,
	primaryNavLink,
	nestedNavLink
) => {
	console.log('dEATAIL')

	await sleep(driver, 1000)

	// Находим кнопку Toggle Favorite и нажимаем 2 раза
	const saveFavoriteOnLearMorePageBtn = await driver.wait(
		until.elementLocated(By.css('button[aria-label="Toggle Favorite"]'))
	)
	await driver.wait(until.elementIsVisible(saveFavoriteOnLearMorePageBtn), 5000)
	await scrollWindowToElement(driver, saveFavoriteOnLearMorePageBtn, 2000)
	await saveFavoriteOnLearMorePageBtn.click()
	await sleep(driver, 2000)
	await saveFavoriteOnLearMorePageBtn.click()
	await sleep(driver, 2000)

	// Прокручиваем страницу до кнопки перехода на стр. и нажимаем
	await scrollWindowToElement(driver, primaryNavLink, 2000)
	await primaryNavLink.click()

	// Если есть вложенные пути то переходим по ним
	if (nestedNavLink) {
		await sleep(driver, 2000)

		let secondaryNavElement = null

		if (nestedNavLink === 'myRecipesBtn') {
			secondaryNavElement = await driver.wait(
				until.elementLocated(By.xpath('//a[contains(text(), "My Recipes")]'))
			)
			await driver.wait(until.elementIsVisible(secondaryNavElement), 5000)
			await scrollWindowToElement(driver, secondaryNavElement, 1000)
		} else {
			secondaryNavElement = await driver.wait(
				until.elementLocated(By.xpath('//a[contains(text(), "Saved Recipes")]'))
			)
			await driver.wait(until.elementIsVisible(secondaryNavElement), 5000)
			await scrollWindowToElement(driver, secondaryNavElement, 1000)
		}

		await sleep(driver, 2000)
		await secondaryNavElement.click()
	}
}

module.exports = { checkDetailFavoriteRecipe }
