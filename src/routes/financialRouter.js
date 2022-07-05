import {Router} from "express";
import {postFinancial, getFinancial, getSum} from "../controllers/financialController.js";
import authRouter from "./authRouter";

const financialRouter = Router();

financialRouter.post("/financial-events", postFinancial);
financialRouter.get("/financial-events", getFinancial);
financialRouter.get("/financial-events/sum", getSum);

export default authRouter;