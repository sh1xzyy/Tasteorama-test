const { Key } = require('selenium-webdriver')
const { sleep } = require('./sleep')

const openLogoutModal = async (driver, logoutBtn) => {
	await logoutBtn.sendKeys(Key.RETURN)
	await sleep(driver, 1000)
}

module.exports = { openLogoutModal }
