import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index"
import { compare } from "bcrypt";

const editPassword = async (req: Request, res: Response) => {
  const { userid } = req.body.user;
  const (oldPassword, newPassword1, newPassword2) = req.body;
  
  try {
    const user = await prisma.user.findUnique({
        where: { id: userid}
    });

    const isPasswordCorrect = await compare(user.password, user.password);

    if (!isPasswordCorrect) {
        res.status(401).json(ServiceResponse.unauthorized("Invalid password"));
        return;
    }


  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};
