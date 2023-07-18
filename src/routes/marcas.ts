import { Router } from "express";
import MarcasController from "../controller/MarcasController";




const routes = Router();

routes.get('', MarcasController.getAll);
routes.get('/:id', MarcasController.getById);
routes.post('', MarcasController.add);
routes.patch("", MarcasController.update);
routes.delete("/:id", MarcasController.delete);

export  default routes;