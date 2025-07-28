const scrollWindowToBottom = async driver => {
	await driver.executeScript(
		'window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"})'
	)
}

module.exports = { scrollWindowToBottom }
