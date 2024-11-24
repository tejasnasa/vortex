import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const viewComments = async (req: Request, res: Response) => {
  const { userid } = req.body.user;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        userid: userid,
      },
      include: {
        post: true,
        likes: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res
      .status(200)
      .json(ServiceResponse.success("Comments fetched successfully", comments));
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default viewComments;
