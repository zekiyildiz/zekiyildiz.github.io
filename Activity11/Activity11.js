$(document).ready(function () {
    $('#nav_list a').on('click', function (event) {
        event.preventDefault();

        const fileName = $(this).attr('title');
        const jsonFile = `json_files/${fileName}.json`;

        $.getJSON(jsonFile, function (data) {
            //clear main
            $('main').empty();

            const speaker = data.speakers[0]; 

            const content = `
                <h1>${speaker.title}</h1>
                <img src="${speaker.image}" alt="${speaker.speaker}">
                <h2>${speaker.month}<br>${speaker.speaker}</h2>
                <p>${speaker.text}</p>
            `;
            //append new json to main
            $('main').append(content);
        }).fail(function () {
            alert('JSON dosyası yüklenemedi: ' + jsonFile);
        });
    });
});