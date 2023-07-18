import { Router } from "express";
import UsuariosController from "../controller/UsuariosController";



const routes = Router();

routes.get('', UsuariosController.getAll);
routes.post('', UsuariosController.add);
export  default routes;