import {Router} from "express";
import { getProfesores } from "../controllers/profesoresControllers.js";

const router = Router();

router.get("/" , getProfesores);

export default router;