import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const viewBookmarks = async (req: Request, res: Response) => {
  const { userid } = req.body.user;

  try {
    const bookmarks = await prisma.bookmark.findMany({
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
      .json(ServiceResponse.success("Bookmarks are shown", bookmarks));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default viewBookmarks;
