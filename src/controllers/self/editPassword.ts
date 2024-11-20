import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";
import { compare, hash } from "bcrypt";
import { Request, Response } from "express";

const editPassword = async (req: Request, res: Response) => {
  const { userid } = req.body.user;
  const { oldPassword, newPassword1, newPassword2 } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userid },
    });

    if (!user) {
      res.status(404).json(ServiceResponse.notFound("User not found"));
      return;
    }

    const isPasswordCorrect = await compare(user.password, oldPassword);

    if (!isPasswordCorrect) {
      res.status(401).json(ServiceResponse.unauthorized("Invalid password"));
      return;
    }

    if (newPassword1 !== newPassword2) {
      res.status(400).json(ServiceResponse.failed("Passwords do not match"));
      return;
    }

    if (newPassword1 === oldPassword) {
      res.status(400).json(ServiceResponse.failed("New password is same"));
      return;
    }

    const hashedPassword = await hash(newPassword1, 10);
    await prisma.user.update({
      where: { id: userid },
      data: { password: hashedPassword },
    });

    res
      .status(200)
      .json(ServiceResponse.success("Password updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default editPassword;
