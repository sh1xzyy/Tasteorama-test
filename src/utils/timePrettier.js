const timePrettier = startTime => {
	const totalSeconds = Math.floor(startTime / 1000)
	const seconds = totalSeconds % 60
	const minutes = Math.floor((totalSeconds / 60) % 60)
	const hours = Math.floor(totalSeconds / 3600)

	const convertToString = time => String(time).padStart(2, '0')
	return `${convertToString(hours)}:${convertToString(
		minutes
	)}:${convertToString(seconds)}`
}

module.exports = { timePrettier }
