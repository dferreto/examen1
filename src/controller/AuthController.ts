import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import * as jwt from "jsonwebtoken";
import { Usuario } from "../entity/Usuario";

class AuthController {
    static login = async (req: Request, resp: Response) => {
        const { correo, contrasena } = req.body;
    
        // Verificar si se proporcionó el correo y la contraseña
        if (!(correo || contrasena)) {
          return resp
            .status(400)
            .json({ mensaje: "Usuario o contraseña incorrecta" });
        }
    
        // Obtener el repositorio de usuarios
        const repoUsuario = AppDataSource.getRepository(Usuario);
        let usuario: Usuario;
        try {
          // Buscar el usuario por su correo en la base de datos
          usuario = await repoUsuario.findOneOrFail({ where:{  correo } });
        } catch (error) {
          return resp
            .status(400)
            .json({ mensaje: "Usuario o contraseña incorrecta" });
        }
    
        // Verificar si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
        if (!usuario.checkPassword(contrasena)) {
          return resp
            .status(400)
            .json({ mensaje: "Usuario o contraseña incorrecta" });
        }
    
        // Generar un token JWT válido y firmado con la cédula del usuario
        const token = jwt.sign({ cedula: usuario.cedula }, "utnKey1234", {
          expiresIn: "5m",
        });
    
        // Enviar la respuesta con el token JWT, el rol y la cédula del usuario
        return resp
          .status(200)
          .json({ token, role: usuario.rol, cedula: usuario.cedula });
      };
    }

export default AuthController;
