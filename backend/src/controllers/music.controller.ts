/**
 * Music Controller
 *
 * Handles all HTTP request/response cycles related to music items.
 *
 */

// TYPES IMPORTS
import type {
  FilterOptions,
  SortOptions,
} from "../../../shared/types/music.js";
// NPM IMPORTS
import { Request, Response, NextFunction } from "express";
import debug from "debug";
// LOCAL IMPORTS
import ApiError from "../utilities/ApiError.js";
import {
  createOne,
  findAllMusic,
  findMusicFeatured,
  findOneMusicById,
} from "../services/music.service.js";

// Debug logger for music-related actions
const debugMusic = debug("app:music");

const MusicController = {
  /**
   * Fetches all music items, optionally filtered and sorted.
   *
   * @param req - Express request object.
   *   - req.query.sortBy: Field to sort by (e.g., title, artist).
   *   - req.query.order: Sort order ("asc" or "desc").
   *   - req.query.title: Filter by title.
   *   - req.query.artist: Filter by artist name.
   *   - req.query.genre: Filter by genre.
   *   - req.query.featured: Filter whether the item is "featured" or not.
   * @param res - Express response object.
   * @param next - Express next function for error handling.
   *
   * @returns JSON list of music items.
   */
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { sortBy, order, title, artist, genre, featured } = req.query;
      const filters: FilterOptions = {
        title: title as string,
        artist: artist as string,
        genre: genre as string,
        featured: featured as string,
      };
      debugMusic(`Music Sort: ${sortBy}:${order}`);
      debugMusic("Music Filters:", filters);
      const music = await findAllMusic(
        sortBy as SortOptions["sortBy"],
        order as SortOptions["order"],
        filters
      );
      res.status(200).send(music);
    } catch (error) {
      return next(
        ApiError.internal("Something went wrong while fetching 'music'", error)
      );
    }
  },

  /**
   * Fetches a single music item by its unique ID.
   *
   * @param req - Express request object.
   *   - req.params.id: The music item's unique identifier.
   * @param res - Express response object.
   * @param next - Express next function for error handling.
   *
   * @returns JSON object representing a music item, or 404 if not found.
   */
  async getOneById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const music = await findOneMusicById(id);
      if (!music) {
        next(ApiError.notFound());
      }
      res.status(200).send(music);
    } catch (error) {
      return next(
        ApiError.internal(
          `Something went wrong while fetching 'music' with 'id':${id}`,
          error
        )
      );
    }
  },

  /**
   * Fetches a list of featured music items.
   *
   * @param req - Express request object.
   * @param res - Express response object.
   * @param next - Express next function for error handling.
   *
   * @returns JSON list of featured music items.
   */
  async getFeatured(req: Request, res: Response, next: NextFunction) {
    try {
      const music = await findMusicFeatured();
      res.status(200).send(music);
    } catch (error) {
      return next(
        ApiError.internal(
          "Something went wrong while fetching 'featured music'",
          error
        )
      );
    }
  },

  /**
   * Creates a new music item in the database.
   *
   * @param req - Express request object.
   *   - req.body: The music item data (title, artist, genre, etc).
   * @param res - Express response object.
   * @param next - Express next function for error handling.
   *
   * @returns JSON object of the newly created music item.
   */
  async createMusicItem(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createOne(req.body);
      res.status(201).send(result);
    } catch (error) {
      return next(
        ApiError.internal(
          "Something went wrong while creating music item",
          error
        )
      );
    }
  },
};

export default MusicController;
