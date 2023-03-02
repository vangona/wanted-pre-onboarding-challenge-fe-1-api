import { StatusCodes } from "http-status-codes";
import { createError } from "../utils/responseUtils";
export const validateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .send(createError("Token is missing"));
    }
    next();
};
