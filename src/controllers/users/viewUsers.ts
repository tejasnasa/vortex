import { Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";

const viewUsers = async (req: Request, res: Response) => {
  const { userid } = req.body.user;
  try {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: userid } },
          {
            followers: {
              none: {
                followerid: userid,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        avatar: true,
      },
    });

    res.status(200).json(ServiceResponse.success("Users found", users));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default viewUsers;
