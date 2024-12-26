import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const getStories = async (req: Request, res: Response) => {
  const { userid } = req.body.user;

  try {
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - 24);

    const posts = await prisma.story.findMany({
      where: {
        AND: [
          {
            created_at: {
              gte: cutoffDate,
            },
          },
          {
            OR: [
              {
                user: {
                  followers: {
                    some: {
                      followerid: userid,
                    },
                  },
                },
              },
              {
                userid: userid,
              },
            ],
          },
        ],
      },
      select: {
        id: true,
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
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res
      .status(200)
      .json(ServiceResponse.success("Stories are shown", posts));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default getStories;
