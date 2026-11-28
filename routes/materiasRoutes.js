import {Router} from "express";
import { getMaterias , getUnaMateria , postMateria , deleteMateria , updateMateria } from "../controllers/materiasControllers.js";
const router = Router();

router.get("/", getMaterias);
router.get("/:id", getUnaMateria);
router.post("/", postMateria);
router.delete("/:id", deleteMateria);
router.put("/:id", updateMateria);


export default router;