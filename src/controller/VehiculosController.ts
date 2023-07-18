import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Vehiculo } from "../entity/Vehiculo";
import { validate } from "class-validator";


class VehiculosController{


   // Método para obtener un vehículo por su placa.
   static getById = async (req: Request, resp: Response) => {
    try {
        const placa = req.params["placa"];
        if (!placa) {
            return resp.status(404).json({ mensaje: 'No se indica la placa del vehículo' });
        }

        const vehiculosRepo = AppDataSource.getRepository(Vehiculo);
        let vehiculo;
        try {
            vehiculo = await vehiculosRepo.findOneOrFail({ where: { placa, estado: true } });
        } catch (error) {
            return resp.status(404).json({ mensaje: 'No se encontró el vehículo con esa placa' });
        }

        return resp.status(400).json({ vehiculo });
    } catch (error) {
        return resp.status(400).json({ mensaje: error });
    }
}

// Método para agregar un nuevo vehículo.
static add = async (req: Request, resp: Response) => {
    try {
        // Obtenemos los datos del cuerpo de la solicitud utilizando destructuring.
        const { placa, id_marca, id_color, cilindraje, id_TipoVehiculo, cantidadPasajeros } = req.body;

        if (!id_marca) {
            return resp.status(404).json({ mensaje: 'La marca no existe en la base de datos' });
        }

        // Validamos que no exista un vehículo con la misma placa.
        const vehiculosRepo = AppDataSource.getRepository(Vehiculo);
        const vehic = await vehiculosRepo.findOne({ where: { placa } });

        if (vehic) {
            return resp.status(400).json({ mensaje: "El vehículo ya existe en la base de datos" });
        }

        const fecha = new Date;
        let vehiculo = new Vehiculo;
        vehiculo.placa = placa;
        vehiculo.id_marca = id_marca;
        vehiculo.id_color = id_color;
        vehiculo.cilindraje = cilindraje;
        vehiculo.id_TipoVehiculo = id_TipoVehiculo;
        vehiculo.cantidadPasajeros = cantidadPasajeros;
        vehiculo.fecha_ingreso = fecha;
        vehiculo.estado = true;

        // Validar la instancia de Vehiculo con class-validator.
        const errors = await validate(vehiculo, { validationError: { target: false, value: false } });
        if (errors.length > 0) {
            return resp.status(400).json(errors)
        }

        // Guardamos el nuevo vehículo en la base de datos.
        await vehiculosRepo.save(vehiculo);
        return resp.status(200).json({ mensaje: 'Vehículo Creado' });

    } catch (error) {
        return resp.status(400).json({ mensaje: error });
    }
}

// Método para eliminar un vehículo por su placa .
static delete = async (req: Request, resp: Response) => {
    try {
        const placa = req.params['placa'];
        if (!placa) {
            return resp.status(404).json({ mensaje: 'Debe indicar la placa' });
        }

        const vehiculosRepo = AppDataSource.getRepository(Vehiculo);
        let vehic: Vehiculo;

        try {
            vehic = await vehiculosRepo.findOneOrFail({ where: { placa, estado: true } });
        } catch (error) {
            return resp.status(404).json({ mensaje: 'No se encuentra el vehículo con esa placa' });
        }

        // Desactivamos el vehículo cambiando su estado a "false".
        vehic.estado = false;
        try {
            await vehiculosRepo.save(vehic);
            return resp.status(200).json({ mensaje: 'Se eliminó correctamente' })
        } catch (error) {
            return resp.status(400).json({ mensaje: 'No se pudo eliminar' })
        }
    } catch (error) {
        return resp.status(400).json({ mensaje: 'No se pudo eliminar' });
    }
}
}

export default VehiculosController;