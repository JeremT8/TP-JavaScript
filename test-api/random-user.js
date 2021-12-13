const URL = "https://randomuser.me/api?results=10&nat=FR";
const call = fetch(URL);

$(document).ready(function(){
    //Ciblage des éléments du DOM à manipuler
    //  const $tbody = $("tbody");

    call.then(function(response){
        return response.json();
        
    })
    .then(function(data){
        console.log(data);
        populateTable(data);
    })
    .catch(function(err){
        console.log(err);
    });
});

function populateTable(data) {
	// un tbody fantome qui n'est pas lié au DOM
	let $shadowTbody = $("tbody");
	for (user of data.results) {
		const $tr = getRow(user);


		$shadowTbody.append($tr);
	}
	// remplacement du tbody par le tbody fantome
	$('tbody').replaceWith($shadowTbody);
}
function getRow(user) {
	const $tr = $("<tr>");+
	$tr.append(
		$(`<td><img src="${user.picture.medium}"></td>`));
	$tr.append(`<td>${user.name.first}</td>`);
	$tr.append(`<td>${user.name.last}</td>`);
	$tr.append(
		$(`<td>
	    		${user.location.street.number}
	    		${user.location.street.name}<br>
			${user.location.postcode}
		</td>`));
	return $tr;
}

