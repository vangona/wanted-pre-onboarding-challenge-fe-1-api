import express from "express";

import * as dailyscrumController from "../controllers/dailyscrumController";

const router = express.Router();

router.get("/groups", dailyscrumController.getGroups);
router.post("/groups", dailyscrumController.createGroups);

export default router;
