import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getGroups = (req: Request, res: Response) => {
  console.log("그룹 호출");
  return res.status(StatusCodes.OK).send("테스트 성공");
};
export const createGroups = () => {};
