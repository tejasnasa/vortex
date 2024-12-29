import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const viewBookmarks = async (req: Request, res: Response) => {
  const { userid } = req.body.user;

  try {
    const posts = await prisma.post.findMany({
      where: {
        bookmarks: {
          some: {
            userid: userid,
          },
        },
      },
      include: {
        user: true,
        likes: {
          include: {
            user: true,
          },
        },
        bookmarks: {
          include: {
            user: true,
          },
        },
        comments: {
          include: {
            user: true,
            likes: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res
      .status(200)
      .json(ServiceResponse.success("Bookmarks are shown", posts));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default viewBookmarks;
