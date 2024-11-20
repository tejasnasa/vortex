import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const likeComment = async (req: Request, res: Response) => {
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

    if (existingLike) {
      res
        .status(400)
        .json(ServiceResponse.failed("You have already liked this comment"));
      return;
    }

    const newLike = await prisma.commentLike.create({
      data: {
        userid: userid,
        commid: commid,
      },
    });

    res
      .status(201)
      .json(ServiceResponse.create("Comment liked successfully", newLike));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default likeComment;
