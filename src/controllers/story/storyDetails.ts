import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const storyDetails = async (req: Request, res: Response) => {
  const { storyid } = req.params;

  try {
    const story = await prisma.story.findUnique({
      where: {
        id: storyid,
      },
      select: {
        id: true,
        imageurl: true,
        created_at: true,
        user: {
          select: {
            id: true,
            username: true,
            fullname: true,
            avatar: true,
          },
        },
      },
    });

    if (!story) {
      res.status(404).json(ServiceResponse.notFound("Story not found"));
      return;
    }

    res.status(200).json(ServiceResponse.success("Story found", story));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default storyDetails;
