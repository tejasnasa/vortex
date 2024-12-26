import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const getMyStories = async (req: Request, res: Response) => {
  const { userid } = req.body.user;

  try {
    const stories = await prisma.story.findMany({
      where: {
        userid: userid,
      },
      select: {
        id: true,
        imageurl: true,
        created_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res.status(200).json(ServiceResponse.success("Stories are shown", stories));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default getMyStories;
