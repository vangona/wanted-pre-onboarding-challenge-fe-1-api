import { ASCII_STARTING_INDEX } from "./../constants/dailyscrum";
import { getDatetime, getWeek } from "./../utils/dailyscrumUtils";
import * as dailyscrumService from "./../services/dailyscrumService";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createResponse } from "../utils/responseUtils";

export const getMembers = (req: Request, res: Response) => {
  return res
    .status(StatusCodes.OK)
    .send(createResponse(dailyscrumService.getMembers()));
};

export const getGroups = (req: Request, res: Response) => {
  const { year, month, week } = req.query;
  if (
    (year && typeof year !== "string") ||
    (month && typeof month !== "string") ||
    (week && typeof week !== "string")
  )
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("날짜 형식이 올바르지 않습니다.");

  const datetime = getDatetime(year, month, week);

  const groupSnapshot = dailyscrumService.findGroupSnapshotByDatetime(datetime);

  if (groupSnapshot instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(groupSnapshot.message);
  } else {
    return res.status(StatusCodes.OK).send(createResponse(groupSnapshot));
  }
};

export const createGroups = async (req: Request, res: Response) => {
  const { year, month, week } = req.body;
  const datetime = getDatetime(year, month, week);

  const newGroupSnapshot = await dailyscrumService.createGroupSnapshot(
    datetime
  );

  if (newGroupSnapshot instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: newGroupSnapshot.message });
  } else {
    return res.status(StatusCodes.OK).send(createResponse(newGroupSnapshot));
  }
};
