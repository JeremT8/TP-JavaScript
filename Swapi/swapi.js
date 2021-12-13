var url = "https://swapi.dev/api/people/?page=1";



async function getPerso (){
    let response = await fetch(url);
    let data = await response.json();
    buttonSync(data);
    populateTable(data);
}


$(document).ready(function(){
    //Ciblage des éléments du DOM à manipuler
    //const $tbody = $("tbody");

    try {
        getPerso();
    } catch (err) {
        console.log(err);
    }
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


function buttonSync(data) {
        if (data.previous != null) {
            $('#b1').click(function () {
                url = data.previous;
                getPerso();
            });
            $('#b1').show();
        }
        else {
        $('#b1').hide();
        }

        if (data.next != null) {
                $('#b2').click(function () {
                url = data.next;
                getPerso();
            });
        $('#b2').show();
        }
        else {
            $('#b2').hide();
        }
}


function populateTable(data) {
    // Un tbody fantome qui n'est pas lié au DOM
    let $shadowTbody = $("<tbody>");

    for (user of data.results) {
        const $tr = getRow(user);

        $shadowTbody.append($tr);
    } 
    // Remplacement du tbody par le tbody fantome
    $("tbody").replaceWith($shadowTbody);
}

function getRow(user) {
    const $tr = $("#template").clone().removeAttr("id");
    $tr.children().eq(0).text(user.name);
    $tr.children().eq(1).text(user.height);
    $tr.children().eq(2).text(user.mass);
    $tr.children().eq(3).html(user.hair_color);
    $tr.children().eq(4).html(user.gender);

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
