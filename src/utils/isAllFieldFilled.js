export const isAllFieldFilled = async fields => {
	let fieldsArray = {}
	for (let key in fields) {
		fieldsArray[key] = await fields[key].getAttribute('value')
	}

	if (Object.values(fieldsArray).every(field => field.length !== 0)) {
		return true
	}
	return false
}
