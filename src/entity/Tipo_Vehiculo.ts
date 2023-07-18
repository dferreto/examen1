import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty, MaxLength } from "class-validator";


@Entity()
export class Tipo_Vehiculo{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: false })
    @MaxLength(20)
    @IsNotEmpty({message: "Falta el nombre del tipo de vehiculo"})
    nombre:string;

    @Column({ nullable: false })
    estado:boolean;

    @OneToMany(()=> Vehiculo, (vehiculo) => vehiculo.tipo_vehiculo)
    vehiculos: Vehiculo;
}