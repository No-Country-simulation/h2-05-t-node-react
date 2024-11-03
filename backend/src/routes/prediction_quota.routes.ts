import express from "express";
import { getPredictionQuotaByDate } from "../controllers/prediction_quota.controller";

const router = express.Router();

router.get("", getPredictionQuotaByDate);

export default router;
