import { Router } from "express";
import marcas from "./marcas";
import vehiculos from "./vehiculos";
import usuarios from "./usuarios";
import auth from "./auth";





const routes = Router();

routes.use('/marcas', marcas) ;
routes.use('/vehiculos', vehiculos);
routes.use('/usuarios', usuarios);
routes.use('/auth', auth);


export default routes;