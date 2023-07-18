import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { Usuario } from "../entity/Usuario";

class UsuariosController {
 // Método para obtener todos los usuarios activos.
 static getAll = async (req: Request, resp: Response) => {
    try {
      const usuariosRepo = AppDataSource.getRepository(Usuario);
      const listaUsuarios = await usuariosRepo.find({ where: { estado: true } });

      if (listaUsuarios.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontraron resultados" });
      }

      return resp.status(200).json({ listaUsuarios });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };


  // Método para agregar un nuevo usuario.
  static add = async (req: Request, resp: Response) => {
    try {
      // Obtenemos los datos del cuerpo de la solicitud utilizando destructuring.
      const { cedula, nombre, apellido1, apellido2, correo, contrasena, rol } = req.body;

      let usuario = new Usuario();
      usuario.cedula = cedula;
      usuario.nombre = nombre;
      usuario.apellido1 = apellido1;
      usuario.apellido2 = apellido2;
      usuario.correo = correo;
      usuario.contrasena = contrasena;
      usuario.rol = rol;
      usuario.estado = true;

      // Validamos que no exista un usuario con la misma cédula.
      const usuariosRepo = AppDataSource.getRepository(Usuario);
      let user = await usuariosRepo.findOne({ where: { cedula } });

      if (user) {
        return resp.status(400).json({ mensaje: "Ya existe un usuario con esa cédula" });
      }

      // Validamos que no exista un usuario con el mismo correo electrónico.
      user = await usuariosRepo.findOne({ where: { correo: correo } });
      if (user) {
        return resp.status(400).json({ mensaje: "Ya existe un usuario con el correo" });
      }

      // Validamos la instancia de Usuario con class-validator.
      const errors = await validate(usuario, {
        validationError: { target: false, value: false },
      });
      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      // Encriptamos la contraseña antes de guardarla en la base de datos.
      usuario.hashPassword();

      // Guardamos el nuevo usuario en la base de datos.
      try {
        await usuariosRepo.save(usuario);
        return resp.status(201).json({ mensaje: "Se ha creado el usuario" });
      } catch (error) {
        return resp.status(400).json(error);
      }
    } catch (error) {
      return resp.status(400).json({ message: "Error desconocido" });
    }
  }
}



export default UsuariosController;
