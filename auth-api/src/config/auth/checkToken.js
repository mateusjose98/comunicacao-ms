import jwt from "jsonwebtoken";

import { promisify } from "util";
import UserException from "../../modules/user/exception/UserException.js";
import * as httpStatus from "../../config/constants/httpStatus.js";

const emptySpace = " ";

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UserException(400, "Token não informado");
    }
    let accessToken = authorization;
    if (accessToken.includes(emptySpace)) {
      accessToken = accessToken.split(emptySpace)[1];
    } else {
      accessToken = authorization;
    }
    const decoded = await promisify(jwt.verify)(
      accessToken,
      "KEY-BOLADA-DEMAIS"
    );

    req.authUser = decoded.authUser;
    return next();
  } catch (err) {
    const status = err.status ? err.status : httpStatus.SERVER_ERROR;
    return res.status(status).json({
      status,
      message: err.message,
    });
  }
};
