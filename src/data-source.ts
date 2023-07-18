import "reflect-metadata"
import { DataSource } from "typeorm"
import { Marca } from "./entity/Marca"
import { Tipo_Vehiculo } from "./entity/Tipo_Vehiculo"
import { Vehiculo } from "./entity/Vehiculo"
import { Color } from "./entity/Color"
import { Usuario } from "./entity/Usuario"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "bdexamen",
    synchronize: true,
    logging: false,
    entities: [Marca, Tipo_Vehiculo, Vehiculo, Color, Usuario],
    migrations: [],
    subscribers: [],
})
