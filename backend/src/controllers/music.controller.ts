import { Request, Response, NextFunction } from "express";
import ApiError from "../utilities/ApiError.js";
import debug from "debug";
import { findAllMusic, findOneMusicById } from "../services/music.service.js";
import type {
  FilterOptions,
  SortOptions,
} from "../../../shared/types/music.js";

const debugMusic = debug("app:music");

const MusicController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { sortBy, order, title, artist, genre } = req.query;
      const filters: FilterOptions = {
        title: title as string,
        artist: artist as string,
        genre: genre as string,
      };
      debugMusic(`Music Sort: ${sortBy}:${order}`);
      debugMusic("Music Filters:", filters);
      const music = await findAllMusic(
        sortBy as SortOptions["sortBy"],
        order as SortOptions["order"],
        filters
      );
      res.send(music);
    } catch (error) {
      return next(
        ApiError.internal("Something went wrong while fetching 'music'", error)
      );
    }
  },

  async getOneById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const music = await findOneMusicById(id);
      if (!music) {
        next(ApiError.notFound());
      }
      res.send(music);
    } catch (error) {
      return next(
        ApiError.internal(
          `Something went wrong while fetching 'music' with 'id':${id}`,
          error
        )
      );
    }
  },
};

export default MusicController;
