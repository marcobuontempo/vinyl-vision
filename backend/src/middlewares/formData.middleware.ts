import { Request, Response, NextFunction } from "express";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const parseMusicItemFormData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body = {
    ...req.body,
    price_aud: Number(req.body.price_aud), // convert back into number
    length: Number(req.body.length), // convert back into number
    featured: req.body.featured === "true", // convert back to boolean
  };
  next();
};

export { parseMusicItemFormData };
