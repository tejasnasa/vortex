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
      select: {
        id: true,
        caption: true,
        imageurl: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            id: true,
            username: true,
            fullname: true,
            avatar: true,
          },
        },
        comments: {
          select: {
            text: true,
            created_at: true,
            user: {
              select: {
                id: true,
                username: true,
                fullname: true,
                avatar: true,
              },
            },
            _count: {
              select: {
                likes: true,
              },
            },
          },
        },
        _count: {
          select: {
            bookmarks: true,
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
