import { Request, Response } from "express";
import { hash } from "bcrypt";
import { prisma } from "../../index";
import { createToken } from "../../utils/jwtConfig";
import { ServiceResponse } from "../../models/serviceResponse";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseApp } from "../../utils/firebaseConfig";

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username, fullname } = req.body;
  const auth = getAuth(firebaseApp);

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      const message =
        existingUser.email === email
          ? "Email already exists"
          : "Username already taken";
      res.status(401).json(ServiceResponse.unauthorized(message));
      return;
    }

    const hashedPassword = await hash(password, 10);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUser = userCredential.user;
    await sendEmailVerification(firebaseUser);
    console.log("Email sent!");

    const maxAttempts = 6;
    const pollInterval = 9600;
    let attempts = 0;

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
      await firebaseUser.reload();

      if (firebaseUser.emailVerified) {
        const newUser = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            username,
            fullname,
          },
        });

        const token = createToken({
          userid: newUser.id,
        });
        await deleteUser(firebaseUser);

        res.status(201).json(
          ServiceResponse.create("User created successfully", {
            accessToken: token,
            user: newUser,
          })
        );
        return;
      }

      attempts++;
    }

    await deleteUser(firebaseUser);
    res
      .status(400)
      .json(ServiceResponse.badrequest("Email verification not completed."));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default register;
