import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const editProfile = async (req: Request, res: Response) => {
  const { bio, avatar, isPrivate } = req.body;
  const { userid } = req.body.user;

  try {
    const updatedProfile = await prisma.user.update({
      where: { id: userid },
      data: {
        private: isPrivate,
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
