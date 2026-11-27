import {Router} from "express";
import { getProfesores , getUnProfesor } from "../controllers/profesoresControllers.js";

const router = Router();

router.get("/" , getProfesores);
router.get("/:id" , getUnProfesor);

export default router;  