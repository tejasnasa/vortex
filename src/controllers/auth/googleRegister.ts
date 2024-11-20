import { Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";
import { createToken } from "../../utils/jwtConfig";

const googleRegister = async (req: Request, res: Response) => {
  const { email, username, fullname } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      res
        .status(401)
        .json(ServiceResponse.unauthorized("Username not available"));
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        fullname,
      },
    });

    const token = createToken({
      userid: newUser.id,
    });

    res.status(201).json(
      ServiceResponse.create("User created successfully", {
        accessToken: token,
        user: newUser,
      })
    );
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default googleRegister;
