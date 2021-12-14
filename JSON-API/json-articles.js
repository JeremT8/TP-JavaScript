const URL = "http://localhost:3000/articles";
let $template;

// Fonction d'affichage de la liste des articles 
function showArticles(data) {
	const $shadowTbody = $("<tbody>");
	for (item of data) {
		const $row = $rowTemplate.clone();
		$row.children()
		.first().text(item.id)
		.next().text(item.title)
		$shadowTbody.append($row);
	}
	$("tbody").replaceWith($shadowTbody);
}


async function getArticles() {
	const response = await fetch(URL);
	const data = await response.json();
	showArticles(data);
}


$(document).ready(function() {
	$rowTemplate = $("#template").clone().removeAttr("id");
	getArticles();

	// Traitement du formulaire
	$("form").submit(async function(event) { 
		event.preventDefault();

		const postedData = $(this).serializeObject();

		await fetch(URL, {
			"method": "post",
			headers: {
				"Accept": "Application/json",
				"Content-Type": "Application/json"
			},
			body: JSON.stringify(postedData)
		});

		getArticles()
	})
});