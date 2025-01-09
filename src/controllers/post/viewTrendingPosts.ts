import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const viewTrendingPosts = async (req: Request, res: Response) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  try {
    const posts = await prisma.post.findMany({
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
        likes: {
          _count: "desc",
        },
      },
    });

    res.status(200).json(ServiceResponse.success("Posts are shown", posts));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default viewTrendingPosts;
