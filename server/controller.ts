import {Database} from "sqlite3";
import {Express, Request, Response} from "express";


export function registerRoutes(app: Express, database: Database) {
    app.get('/', (req: Request, res: Response) => {
        res.send('Successfully connected to the API');
    });

    /**
     * PLAYLISTS
     */

    app.get('/playlists', (req: Request, res: Response) => {
        const query = `SELECT pl.PlaylistId as PlaylistId, pl.Name as Name, substr(group_concat(t.Name, ", "),0 ,500) as Description FROM playlists as pl LEFT JOIN playlist_track as pt ON pl.PlaylistId = pt.PlaylistId LEFT JOIN tracks as t ON pt.TrackId = t.trackId GROUP BY pl.PlaylistId`;
        database.all(query, ((err, rows) => {
            res.json(rows);
        }))
    })

    app.get('/playlists/z/:term', (req: Request, res: Response) => {
        const term = req.params.term
        if(!term) {
            throw new Error("Must supply playlist search term")
        }

        const query = `SELECT pl.PlaylistId as PlaylistId, pl.Name as Name, substr(group_concat(t.Name, ", "),0 ,500) as Description FROM playlists as pl LEFT JOIN playlist_track as pt ON pl.PlaylistId = pt.PlaylistId LEFT JOIN tracks as t ON pt.TrackId = t.trackId WHERE pl.Name LIKE '%' || ? || '%' GROUP BY pl.PlaylistId`;
        database.all(query, [term], req, ((err, rows) => {
            if(err) {
                throw err
            }

            res.json(rows);
        }))
    })

    app.get('/playlists/:id', (req: Request, res: Response) => {
        const id = req.params.id
        if(!id) {
            throw new Error("Must supply playlist id")
        }

        const query = 'SELECT * FROM playlists WHERE PlaylistId = ?';
        database.get(query, [id], req, ((err, rows) => {
            if(err) {
                throw err
            }

            res.json(rows);
        }))
    })

    app.get('/playlists/:id/tracks', (req: Request, res: Response) => {
        const id = req.params.id
        if(!id) {
            throw new Error("Must supply playlist id")
        }

        const query = 'SELECT * FROM tracks WHERE TrackId IN (SELECT TrackId FROM playlist_track WHERE PlaylistId = ?)';
        database.all(query, [id], req, ((err, rows) => {
            if(err) {
                throw err
            }

            res.json(rows);
        }))
    })

    /**
     * ALBUMS
     */

    app.get('/albums', (req: Request, res: Response) => {
        const query = `SELECT * FROM albums`;
        database.all(query, ((err, rows) => {
            res.json(rows);
        }))
    })

    app.get('/albums/:id', (req: Request, res: Response) => {
        const id = req.params.id
        if(!id) {
            throw new Error("Must supply album id")
        }

        const query = 'SELECT * FROM albums WHERE AlbumId = ?';
        database.get(query, [id], req, ((err, rows) => {
            if(err) {
                throw err
            }

            res.json(rows);
        }))
    })

    app.get('/albums/:id/tracks', (req: Request, res: Response) => {
        const id = req.params.id
        if(!id) {
            throw new Error("Must supply album id")
        }

        const query = 'SELECT * FROM tracks WHERE AlbumId = ?';
        database.all(query, [id], req, ((err, rows) => {
            if(err) {
                throw err
            }

            res.json(rows);
        }))
    })

    /**
     * TRACKS
     */

    app.get('/tracks', (req: Request, res: Response) => {
        const query = `SELECT * FROM tracks`;
        database.all(query, ((err, rows) => {
            res.json(rows);
        }))
    })

    app.get('/tracks/:id', (req: Request, res: Response) => {
        const id = req.params.id
        if(!id) {
            throw new Error("Must supply track id")
        }

        const query = 'SELECT * FROM tracks WHERE TrackID = ?';
        database.get(query, [id], req, ((err, rows) => {
            if(err) {
                throw err
            }

            res.json(rows);
        }))
    })

    /**
     * GENRES
     */

    app.get('/genres', (req: Request, res: Response) => {
        const query = `SELECT * FROM genres`;
        database.all(query, ((err, rows) => {
            res.json(rows);
        }))
    })

    app.get('/genres/:id', (req: Request, res: Response) => {
        const id = req.params.id
        if(!id) {
            throw new Error("Must supply genre id")
        }

        const query = 'SELECT * FROM genres WHERE GenreId = ?';
        database.get(query, [id], req, ((err, rows) => {
            if(err) {
                throw err
            }

            res.json(rows);
        }))
    })


}
