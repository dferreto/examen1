import { Request, Response } from "express";
import { Marca } from "../entity/Marca";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";

class MarcasController {
  // Método para obtener todas las marcas activas.
  static getAll = async (req: Request, resp: Response) => {
    try {
      const marcasRepo = AppDataSource.getRepository(Marca);
      const listaMarcas = await marcasRepo.find({ where: { estado: true } });

      if (listaMarcas.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontraron resultados" });
      }

      return resp.status(200).json({ listaMarcas });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  // Método para obtener una marca por su ID.
  static getById = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);
      if (!id) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      const marcasRepo = AppDataSource.getRepository(Marca);
      let marca;
      try {
        marca = await marcasRepo.findOneOrFail({ where: { id, estado: true } });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontró la marca con ese ID" });
      }

      return resp.status(200).json({ marca });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  // Método para agregar una nueva marca.
  static add = async (req: Request, resp: Response) => {
    try {
      // Obtenemos los datos del cuerpo de la solicitud.
      const { nombre, metalizado } = req.body;

      const marcasRepo = AppDataSource.getRepository(Marca);
      const marc = await marcasRepo.findOne({ where: { nombre } });

      if (marc) {
        return resp
          .status(400)
          .json({ mensaje: "La marca ya existe en la base de datos" });
      }

      // Creamos una nueva instancia de Marca y le asignamos los valores.
      let marca = new Marca();
      marca.nombre = nombre;
      marca.metalizado = metalizado;
      marca.estado = true;

      // Validamos la instancia de Marca con class-validator.
      const errors = await validate(marca, {
        validationError: { target: false, value: false },
      });
      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      // Guardamos la nueva marca en la base de datos.
      await marcasRepo.save(marca);
      return resp.status(200).json({ mensaje: "Marca creada" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  // Método para actualizar una marca existente por su ID.
  static update = async (req: Request, resp: Response) => {
    try {
      // Obtenemos los datos del cuerpo de la solicitud.
      const { id, nombre, metalizado } = req.body;

      const marcasRepo = AppDataSource.getRepository(Marca);
      let marc: Marca;
      try {
        marc = await marcasRepo.findOneOrFail({ where: { id } });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No existe la marca." });
      }

      // Actualizamos los valores de la marca.
      marc.nombre = nombre;
      marc.metalizado = metalizado;
      marc.estado = true;

      // Validamos la instancia de Marca con class-validator.
      const errors = await validate(marc, {
        validationError: { target: false, value: false },
      });
      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      // Guardamos los cambios en la base de datos.
      try {
        await marcasRepo.save(marc);
        return resp.status(200).json({ mensaje: "Se guardó correctamente." });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se pudo guardar." });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  // Método para eliminar una marca por su ID .
  static delete = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);
      if (!id) {
        return resp.status(404).json({ mensaje: "Debe indicar el ID" });
      }

      const marcasRepo = AppDataSource.getRepository(Marca);
      let marc: Marca;

      try {
        marc = await marcasRepo.findOneOrFail({ where: { id, estado: true } });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encuentra la marca con ese ID" });
      }

      // Desactivamos la marca cambiando su estado a "false".
      marc.estado = false;
      try {
        await marcasRepo.save(marc);
        return resp.status(200).json({ mensaje: "Se eliminó correctamente" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se pudo eliminar" });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "No se pudo eliminar" });
    }
  };
}

export default MarcasController;
