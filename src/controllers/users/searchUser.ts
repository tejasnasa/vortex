import { Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";

const searchUser = async (req: Request, res: Response) => {
  const { query } = req.body;
  try {
    if (!query || typeof query !== "string") {
      res
        .status(400)
        .json(ServiceResponse.failed("Invalid or missing search query"));
      return;
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } },
          { fullname: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        avatar: true,
      },
    });

    if (users.length === 0) {
      res.status(404).json(ServiceResponse.notFound("No users found"));
      return;
    }

    res.status(200).json(ServiceResponse.success("Users found", users));
  } catch (error) {
    console.error(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default searchUser;
