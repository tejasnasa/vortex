import { Request, Response } from "express";

const login = (req: Request, res: Response) => {
  res.send("login hello yes");
};

export default login;
