import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const postDetails = async (req: Request, res: Response) => {
  const { postid } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postid,
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
            likes: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      res.status(404).json(ServiceResponse.notFound("Post not found"));
      return;
    }

    res.status(200).json(ServiceResponse.success("Post found", post));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default postDetails;
