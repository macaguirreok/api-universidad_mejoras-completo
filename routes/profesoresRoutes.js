import {Router} from "express";
import { getProfesores , getUnProfesor, postProfesor, deleteProfesor, updateProfesor } from "../controllers/profesoresControllers.js";

const router = Router();

router.get("/" , getProfesores);
router.get("/:id" , getUnProfesor);
router.post("/" , postProfesor);
router.delete("/:id" , deleteProfesor);
router.put("/:id" , updateProfesor);

export default router;  