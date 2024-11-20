import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const editProfile = async (req: Request, res: Response) => {
  const { username, bio, avatar } = req.body;
  const { userid } = req.body.user;

  try {
    if (username) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser && existingUser.id !== userid) {
        res
          .status(400)
          .json(ServiceResponse.failed("Username is already taken"));
        return;
      }
    }

    const updatedProfile = await prisma.user.update({
      where: { id: userid },
      data: {
        username,
        bio,
        avatar,
      },
    });

    res
      .status(200)
      .json(
        ServiceResponse.success("Profile updated successfully", updatedProfile)
      );
  } catch (error) {
    console.error(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default editProfile;
