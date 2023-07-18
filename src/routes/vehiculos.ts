import { Router } from "express";
import VehiculosController from "../controller/VehiculosController";





const routes = Router();

routes.get('/:placa', VehiculosController.getById);
routes.post('', VehiculosController.add);
routes.delete("/:placa", VehiculosController.delete);

export  default routes;