const sleep = async (driver, time) => {
	await driver.sleep(time)
}

module.exports = { sleep }
