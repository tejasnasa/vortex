import { Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";
import { createToken } from "../../utils/jwtConfig";

const googleLogin = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(401).json(ServiceResponse.unauthorized("User doesn't exist"));
      return;
    }

    const token = createToken({
      userid: user.id,
    });

    res.status(200).json(
      ServiceResponse.success("Sign-in successful", {
        accessToken: token,
        user,
      })
    );
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default googleLogin;