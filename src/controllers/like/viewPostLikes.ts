import { Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";

const viewPostLikes = async (req: Request, res: Response) => {
  const { userid } = req.body.user;

  try {
    const likes = await prisma.postLike.findMany({
      where: {
        userid: userid,
      },
      include: {
        post: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res
      .status(200)
      .json(ServiceResponse.success("Likes successfully fetched", likes));
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default viewPostLikes;
