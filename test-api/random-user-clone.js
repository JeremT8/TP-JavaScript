const URL = "https://randomuser.me/api?results=10&nat=FR";


async function getRandomUsers (){
    const response = await fetch(URL);
    const data = await response.json();

    populateTable(data);
}

$(document).ready(function(){
    //Ciblage des éléments du DOM à manipuler
    //const $tbody = $("tbody");

    try {
        getRandomUsers();
    } catch (err) {
        console.log(err);
    };
    /*
    call.then(function(response){
        return response.json(); 
    })
    .then(function(data){
        console.log(data);
        populateTable(data);
    })
    .catch(function(err){
        console.log(err);
    });*/
});

function populateTable(data) {
    // Un tbody fantome qui n'est pas lié au DOM
    let $shadowTbody = $("tbody");

    for (user of data.results) {
        const $tr = getRow(user);

        $shadowTbody.append($tr);
    } 
    // Remplacement du tbody par le tbody fantome
    $("tbody").replaceWith($shadowTbody);
}

function getRow(user) {
    const $tr = $("#template").clone().removeAttr("id");
    $tr.children().first().children().first().attr("src", user.picture.thumbnail);
    $tr.children().eq(1).text(user.name.first);
    $tr.children().eq(2).text(user.name.last);
    $tr.children().eq(3).html(`
        ${user.location.street.number}
        ${user.location.street.name} <br>
        ${user.location.postcode} 
        ${user.location.city}`);

    /*
    $tr.append($(`<td><img src="${user.picture.thumbnail}"</td>`));
    $tr.append($(`<td>${user.name.first}</td>`));
    $tr.append($(`<td>${user.name.last}</td>`));
    $tr.append($(`<td>
                ${user.location.street.number}
                ${user.location.street.name} <br>
                ${user.location.postcode} 
                ${user.location.city}</td>`));
    */
    return $tr;
}
