import userRepository from "../repository/userRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
import UserException from "../exception/UserException.js";

class UserService {
  async findByEmail(req) {
    try {
      const { email } = req.params;
      this.validateRequest(email);
      let user = await userRepository.findByEmail(email);
      console.log(user);
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
}
export default new UserService();
