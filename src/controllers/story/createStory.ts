import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const createStory = async (req: Request, res: Response) => {
  const { userid } = req.body.user;
  const { imageurl } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userid },
    });

    if (!user) {
      res.status(404).json(ServiceResponse.notFound("User not found"));
      return;
    }

    const story = await prisma.story.create({
      data: {
        imageurl,
        user: {
          connect: { id: userid },
        },
      },
    });

    res.status(201).json(ServiceResponse.create("Story created"));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default createStory;
