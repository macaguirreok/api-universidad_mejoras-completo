import {Router} from "express";
import { getProfesores , getUnProfesor, postProfesor } from "../controllers/profesoresControllers.js";

const router = Router();

router.get("/" , getProfesores);
router.get("/:id" , getUnProfesor);
router.post("/" , postProfesor);

export default router;  