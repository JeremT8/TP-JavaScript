// Fonction de data-binding

$.fn.bindTo = function (data) {
	const elements = this.find("[data-binding-value]");
	for (let elem of elements) {
		let key = $(elem).data("binding-value");
		if (key in data) {
			$(elem).html(data[key]);
		}
	}
	return this;
}


// definir l'url de l'API
let url = "https://swapi.dev/api/people/";

// Definir les nouveaux liens 
let nextLink, previousLink, $nextButton, $prevButton;

// Definir le template
let $template;

async function getData(url) {
	const response = await fetch(url);
	const rawData = await response.json();
	previousLink = rawData.previous();
	nextLink = rawData.next();
	const data = rawData.results.map(function (item) {
		fetch(item.homeworld)
		.then((response) => response.json())
		.then((data) => {
			return {
			name: item.name,
			gender: item.gender,
			homeworld: homeworldData.name,
			filmNumber: item.films.length
			}
		})
		;
		// const homeworldData = homeworldResponse.json();
		
		showDara(data);
	})

	function showData (data) {
		const $shadowTbody = $("<tbody>");
		for (item of data) {
			const $clone = $template.clone();
			$clone.bindTo(item);
			$shadowTbody.append($clone)
		}
		$("tbody").replaceWith($shadowTbody);
	}

}

$(document).ready(function () {
	$template = $('#template').clone().removeAttr("id")
	$nextButton =$("#nextButton");
	$prevButton =$("#prevButton");
	
	$nextButton.click(function() {
		if (nextLink) {
			getData(previousLink)
		}
	})
	$prevButton.click(function() {
		if (previousLink) {
			getData(previousLink)
		}
	})
	getData(url);
})