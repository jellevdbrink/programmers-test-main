# Technische opdracht

De opdracht is om (een deel van) de volgende functionaliteiten te implementeren.

Het gaat er niet om wat je niet kunt implementeren, maar we zijn vooral benieuwd naar wat je wel hebt kunnen implementeren en hoe en waarom je het op die manier hebt geimplementeerd.

We zien graag leesbare code; voor ons zijn de HTML, CSS en JavaScript allemaal belangrijk.

## Gebruik

- Je hebt nodejs nodig nodig om de boel te kunnen draaien zoals nu gebouwd.
- Installeer de dependencies met `yarn` of `npm install`.
- Met `yarn start` of `npm run start` kun je de front-end starten. De webpagina vind je vervolgens op [http://localhost:1234](http://localhost:1234).
- Met `yarn start-server` of `npm run start-server` kun je de back-end starten. De back-end is daarna te bereiken via [http://localhost:8080](http://localhost:8080).
- Bij wijzigingen zullen de paginas zich updaten/herladen

## Front-end

Er is een basis front-end te vinden in `src`. Dit staat geconfigureerd met [mustache.js](https://github.com/janl/mustache.js/blob/master/README.md) als template-engine.

Indien je nieuwe pagina's wilt toevoegen kan je de `playlist` folder dupliceren, je zal deze nieuwe pagina dan moeten toevoegen aan het `start` commando in de `package.json`.
Hierna moet je het start commando opnieuw draaien.

> Het is niet verplicht om dit template te gebruiken.  
> Indien je liever werkt met [Angular](https://angular.io) mag dit ook.  
> We verzoeken je geen andere frameworks te gebruiken.

## Back-end

Er is een basis back-end te vinden in de `server` map.
Deze server geeft wat informatie over muziek nummers, albums en playlists.

Deze server komt standaard met 8 endpoints.

| Path                    | Omschrijving                       |
| ----------------------- | ---------------------------------- |
| `/tracks`               | Toont alle nummers                 |
| `/tracks/:id`           | Toont een specifiek nummer         |
| `/playlists`            | Toont alle playlists               |
| `/playlists/:id`        | Toont een specifieke playlist      |
| `/playlists/:id/tracks` | Toont alle nummers in een playlist |
| `/albums`               | Toont alle albums                  |
| `/albums/:id`           | Toont een specifieke album         |
| `/albums/:id/tracks`    | Toont alle nummers in een album    |

Na het starten van de back-end kan je bijvoorbeeld naar [`http://localhost:8080/playlists/13/tracks`](http://localhost:8080/playlists/13/tracks) gaan in je browser om de data te bekijken.

> We nodigen je uit om de API aan te passen en uit te breiden indien nodig!

## Opdrachten

In de `images/designs/` folder staan designs voor een simpele applicatie.
Hier onder staan een aantal opdrachten die je uit kunt voeren om deze applicatie na te maken.

Het is de bedoeling dat je applicatie lijkt op de designs, maar het hoeft niet precies overeen te komen.
Maak je niet te druk om bijvoorbeeld exacte formaten, margins of kleuren.

1. De eerste opdrachten is het tonen van alle playlists. Hiervoor is al een API-endpoint wat je kunt gebruiken en in het design zie je hoe je ze kunt tonen.  
2. Als je op een playlist klikt moet je de nummers in die playlist kunnen zien. Dit mag in een apart scherm of, zoals in het design, als een overlay. Toon hier ook de totaalduur van de playlist.
3. Maak een zoekveld, zoals je in het design kunt zien en zorg ervoor dat dit veld de playlists doorzoekbaar maakt. Zodra je op enter drukt, moet de lijst met playlists gefilterd worden.  
   _Optioneel:_ Zorg dat de lijst "live" filtert, dus zonder op een zoek-knop te hoeven klikken.

### Details

De volgende kleuren worden gebruikt in de designs:

Donkergrijs: `hsl(330, 2%, 19%)`  
Donkerblauw: `hsl(194, 85%, 21%)`
