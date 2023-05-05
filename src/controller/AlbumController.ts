import { Request, Response } from "express";
import { AlbumRepository } from "../repository/AlbumRepository";
import { ArtistRepository } from "../repository/ArtistRepository";

export const AlbumController = {
  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const album = await AlbumRepository.findById(id);
    return res.send(album[0]);
  },

  getAll: async (req: Request, res: Response) => {
    const allAlbums = await AlbumRepository.findAll();
    let finalData: Object[] = [];
    await Promise.all(
      allAlbums.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        artist.length > 0 && finalData.push({ album, artist: artist[0] });
      })
    );
    return res.send(finalData);
  },

  getAllHome: async (req: Request, res: Response) => {
    const homeAlbums = await AlbumRepository.findAllHome();
    let finalData: Object[] = [];
    await Promise.all(
      homeAlbums.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        artist.length > 0 && finalData.push({ album, artist: artist[0] });
      })
    );
    // console.log(finalData);
    return res.send(finalData);
  },

  getMoreHome: async (req: Request, res: Response) => {
    const homeAlbums = await AlbumRepository.findMoreHome();
    let finalData: Object[] = [];
    await Promise.all(
      homeAlbums.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        artist.length > 0 && finalData.push({ album, artist: artist[0] });
      })
    );
    return res.send(finalData);
  },

  search: async (req: Request, res: Response) => {
    const str = req.query.search as string;
    const results = await AlbumRepository.search(str);
    let finalData: Object[] = [];
    await Promise.all(
      results.map(async (album) => {
        const artist = await ArtistRepository.findById(album.artist_id);
        if (artist.length > 0) finalData.push({ album, artist: artist[0] });
      })
    );
    return res.send(finalData);
  },
};
