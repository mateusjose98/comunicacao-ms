import userRepository from "../repository/userRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
import UserException from "../exception/UserException.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class UserService {
  async findByEmail(req) {
    try {
      const { email } = req.params;
      const { authUser } = req;
      this.validateRequest(email);
      let user = await userRepository.findByEmail(email);
      this.validateAuthenticateUser(user, authUser);
      this.validateUserNotFound(user);

      return {
        status: httpStatus.SUCCESS,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.SERVER_ERROR,
        message: error.message,
      };
    }
  }

  validateRequest(email) {
    if (!email) {
      throw new UserException(httpStatus.BAD_REQUEST, "Email obrigatório");
    }
  }

  validateUserNotFound(user) {
    if (!user) {
      throw new UserException(httpStatus.NOT_FOUND, "Usuário não encontrado");
    }
  }
  async getAccessToken(req) {
    try {
      const { email, pass } = req.body;
      this.validateAcessTokenData(email, pass);

      let user = await userRepository.findByEmail(email);

      this.validateUserNotFound(user);
      await this.validatePassowrd(pass, user.password);
      const authUser = { id: user.id, name: user.name };
      const accessToken = jwt.sign({ authUser }, "KEY-BOLADA-DEMAIS", {
        expiresIn: "1d",
      });

      return {
        accessToken,
        status: httpStatus.SUCCESS,
      };
    } catch (error) {
      return {
        status: error.status ? error.status : httpStatus.SERVER_ERROR,
        message: error.message,
      };
    }
  }
  validateAcessTokenData(email, pass) {
    if (!email || !pass) {
      throw new UserException(
        httpStatus.BAD_REQUEST,
        "email, pass NÃO INFORMADOS"
      );
    }
  }

  validateAuthenticateUser(user, authUser) {
    if (!authUser || user.id !== authUser.id) {
      throw new UserException(
        httpStatus.FORBIDDEN,
        "You cannot see this user data."
      );
    }
  }

  async validatePassowrd(pass, hash) {
    if (!(await bcrypt.compare(pass, hash))) {
      throw new UserException(httpStatus.UNAUTHORIZED, "Senha inválida");
    }
  }
}
export default new UserService();
