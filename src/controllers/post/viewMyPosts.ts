import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const viewMyPosts = async (req: Request, res: Response) => {
  const { userid } = req.body.user;

  try {
    const posts = await prisma.post.findMany({
      where: {
        user: {
          followers: {
            some: {
              followerid: userid,
            },
          },
        },
      },
      select: {
        id: true,
        caption: true,
        imageurl: true,
        created_at: true,
        user: {
          select: {
            username: true,
            fullname: true,
            avatar: true,
            id: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
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

export default viewMyPosts;
