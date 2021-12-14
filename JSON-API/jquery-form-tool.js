$.fn.serializeObject = function () {
	const arrayData = this.serializeArray();
	const data = {};
	for (object of arrayData) {
		data[object.name] = object.value;
	}

	return data;
}