import Mustache from 'mustache';
import { getData } from '../api/api';

const genres = {};
let playlist = [];
let tracks = [];
let tot_ms = 0;

window.goBack = () => window.location.replace('/');

const fixGenres = async() => {
    const raw_genres = await getData('genres');

    raw_genres.forEach(genre => {
        genres[genre.GenreId] = genre.Name;
    });
}

const totalDuration = () => {
    let tot = tot_ms / 1000;
    let hours = Math.floor(tot / 3600).toString();
    tot %= 3600;

    let min = Math.floor(tot / 60).toString();
    tot %= 60

    let sec = Math.round(tot).toString();

    if (hours.length === 1) hours = '0' + hours;
    if (min.length === 1) min = '0' + min;
    if (sec.length === 1) sec = '0' + sec;

    return `${hours}:${min}:${sec}`;
}

const msToRuntime = ms => {
    ms /= 1000;
    let min = Math.floor(ms / 60).toString();
    ms %= 60;
    let sec = Math.round(ms).toString();

    if (min.length === 1) min = '0' + min;
    if (sec.length === 1) sec = '0' + sec;

    return `${min}:${sec}`;
}

const fetchPlaylist = async(plID) => playlist = await getData(`playlists/${plID}`);
const fetchTracks = async(plID) => {
    const raw_tracks = await getData(`playlists/${plID}/tracks`);
    await fixGenres();

    tracks = raw_tracks.map(x => {
        tot_ms += x.Milliseconds;

        return {
            ...x,
            Genre: genres[x.GenreId],
            RunTime: msToRuntime(x.Milliseconds)
        };
    });
};

async function renderPage() {
    const queryParameters = new URLSearchParams(window.location.search)
    const playlistId = queryParameters.get('id');

    await fetchPlaylist(playlistId);
    await fetchTracks(playlistId);

    const templateData = {
        playlist: playlist,
        tracks: tracks,
        totalDuration: totalDuration()
    }

    const template = document.getElementById('template').innerHTML;
    const rendered = Mustache.render(template, templateData);
    document.getElementById('target').innerHTML = rendered;
}

window.onload = () => {
    renderPage()
}
