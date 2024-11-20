import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const viewBookmarks = async (req: Request, res: Response) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      include: {
        post: true,
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
