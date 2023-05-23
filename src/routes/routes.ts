import express from "express";
import carValueController from "../controllers/carValueController";
import riskRatingController from "../controllers/riskRatingController";
import getQuoteController from "../controllers/getQuoteController";

const router = express.Router();

router.post("/api/carvalue", carValueController);
router.post("/api/riskrating", riskRatingController);
router.post("/api/quote", getQuoteController);

export default router;
