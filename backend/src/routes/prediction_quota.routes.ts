import express from "express";
import { getPredictionQuotaByDate } from "../controllers/prediction_quota.controller";

const router = express.Router();

router.post("", getPredictionQuotaByDate);

export default router;
