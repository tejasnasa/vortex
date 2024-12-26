import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const deleteStory = async (req: Request, res: Response) => {
  const { storyid } = req.params;

  try {
    const story = await prisma.story.findUnique({
      where: {
        id: storyid,
      },
    });

    if (!story) {
      res.status(404).json(ServiceResponse.notFound("Story not found"));
      return;
    }

    await prisma.story.delete({
      where: {
        id: storyid,
      },
    });

    res.status(200).json(ServiceResponse.success("Story deleted successfully"));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default deleteStory;
