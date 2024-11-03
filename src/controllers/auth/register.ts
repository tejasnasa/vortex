import { Request, Response } from "express";

const register = (req: Request, res: Response) => {
  res.send("register hello yes");
};

export default register;
