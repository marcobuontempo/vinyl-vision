import { Request, Response, NextFunction } from "express";
import ApiError from "../utilities/ApiError.js";
import debug from "debug";
import { findAllMusic, findOneMusicById } from "../services/music.service.js";

const debugMusic = debug("app:music");

const MusicController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const music = await findAllMusic();
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
