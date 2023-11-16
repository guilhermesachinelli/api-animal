import { Router } from "express";
import {getAnimals , getAnimalById, createAnimal ,updateAnimal,deleteAnimal} from "../controllers/animal.controller.js";
const animalRouter = Router();
animalRouter.get("/", getAnimals);
animalRouter.get("/:id", getAnimalById);
animalRouter.post("/", createAnimal );
animalRouter.put("/:id", updateAnimal);
animalRouter.delete("/:id", deleteAnimal);
export default animalRouter;