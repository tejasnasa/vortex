import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const bookmarkPost = async (req: Request, res: Response) => {
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

    if (existingBookmark) {
      res
        .status(400)
        .json(ServiceResponse.failed("You have already bookmarked this post"));
      return;
    }

    const newBookmark = await prisma.bookmark.create({
      data: {
        userid: userid,
        postid: postid,
      },
    });

    res
      .status(201)
      .json(ServiceResponse.create("Post bookmarked successfully", newBookmark));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default bookmarkPost;
