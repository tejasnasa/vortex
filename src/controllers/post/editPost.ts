import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const editPost = async (req: Request, res: Response) => {
  const { postid } = req.params;
  const { caption, imageurl } = req.body;
  const { userid } = req.body.user;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postid },
    });

    if (!post) {
      res.status(404).json(ServiceResponse.notFound("Post not found"));
      return;
    }

    if (post.userid !== userid) {
      res
        .status(401)
        .json(
          ServiceResponse.unauthorized("You are not authorized to edit this post")
        );
      return;
    }

    const updatedPost = await prisma.post.update({
      where: { id: postid },
      data: {
        caption,
        imageurl,
      },
    });

    res
      .status(200)
      .json(ServiceResponse.success("Post updated successfully", updatedPost));
  } catch (error) {
    console.error(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default editPost;
