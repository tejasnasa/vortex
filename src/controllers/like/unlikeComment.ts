import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const unlikeComment = async (req: Request, res: Response) => {
  const { commid } = req.params;
  const { userid } = req.body.user;

  try {
    const existingLike = await prisma.commentLike.findUnique({
      where: {
        userid_commid: {
          userid: userid,
          commid: commid,
        },
      },
    });

    if (!existingLike) {
      res
        .status(400)
        .json(ServiceResponse.failed("You have not liked this comment"));
    }

    await prisma.commentLike.delete({
      where: {
        id: existingLike.id,
      },
    });

    res.status(200).json(ServiceResponse.success("Comment disliked successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default unlikeComment;
