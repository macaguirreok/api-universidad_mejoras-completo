import {Router} from "express";
import { getMaterias , getUnaMateria , postMateria } from "../controllers/materiasControllers.js";
const router = Router();

router.get("/", getMaterias);
router.get("/:id", getUnaMateria);
router.post("/", postMateria);


export default router;