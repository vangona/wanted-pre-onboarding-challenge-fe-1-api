import express from "express";

import * as dailyscrumController from "../controllers/dailyscrumController";

const router = express.Router();

router.get("/members", dailyscrumController.getMembers);
router.get("/groups", dailyscrumController.getGroups);
router.get("/new-groups", dailyscrumController.createGroups);

export default router;
