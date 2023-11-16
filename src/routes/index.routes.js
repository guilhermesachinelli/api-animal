import { Router } from "express";
import animalRouter from "./animal.routes";
const router = Router()
router.use("/animal", animalRouter)
router.get("/", (req, res) => {
    return res.status(200).send({ message: "Rota ta funfando" });
});
export default router