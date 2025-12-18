import express, { Express, Request, Response } from "express";
const router = express.Router();
import fs from 'fs';
const routesPath = `${__dirname}/`;
import { removeExtensionFromFile } from "../utils";

fs.readdirSync(routesPath).filter((file: any) => {
  const routeFile = removeExtensionFromFile(file);
  return routeFile !== 'index' && file !== '.DS_Store'
    ? router.use(`/api/v1/${routeFile}`, require(`./${routeFile}`).default)
    : '';
});

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Fitzdo API');
});

router.use('*', (req: Request, res: Response) => {
  res.status(404).json({ errors: { msg: 'URL_NOT_FOUND' } });
});

export default router;