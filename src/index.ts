import Mustache from 'mustache';
import { getData } from './api/api';

let playlists = [];

window.showPlaylist = plID => window.location.replace(`/playlist?id=${plID}`);

const renderPage = (extraData={}) => {
    const templateData = {
        playlists: playlists,
        ...extraData
    };

    const template = document.getElementById('template').innerHTML;
    const rendered = Mustache.render(template, templateData);

    document.getElementById('target').innerHTML = rendered;

    const inputField = document.getElementById('inputfield');
    inputField.addEventListener("keyup", async({key}) => {
        if (key === "Enter") {
            // Hier staat code om na elke keypress te zoeken, maar hij focuste steeds op het begin van de zoekbalk en dat typt natuurlijk niet lekker en ik kreeg het niet gefixt,
            // dus dat heb ik maar geskipt.
            playlists = await getData(`playlists/z/${inputField.value}`);
            inputField.value = "";

            const extra = {searched: true, inputValue: inputField.value, autoFocus: 'autofocus'};
            if (playlists.length === 0) extra['failed'] = 'There are no playlists that match this name.';

            renderPage(extra);
        }
    });
}

window.onload = async() => {
    playlists = await getData('playlists');

    renderPage();
}

