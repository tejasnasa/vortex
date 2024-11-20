import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const unbookmarkPost = async (req: Request, res: Response) => {
  const { postid } = req.params;
  const { userid } = req.body.user;

  try {
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userid_postid: {
          userid: userid,
          postid: postid,
        },
      },
    });

    if (!existingBookmark) {
      res
        .status(400)
        .json(ServiceResponse.failed("You have not bookmarked this post"));
    }

    await prisma.bookmark.delete({
      where: {
        id: existingBookmark.id,
      },
    });

    res
      .status(200)
      .json(ServiceResponse.success("Post unbookmarked successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default unbookmarkPost;
