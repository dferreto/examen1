import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty, MaxLength } from "class-validator";


@Entity()
export class Color{

    @PrimaryColumn({ nullable: false })
    @IsNotEmpty({message: "Falta el id"})
    id:number;

    @Column({ nullable: false })
    @MaxLength(20)
    @IsNotEmpty({message: "Falta el nombre del color"})
    nombre:string;

    @Column({ nullable: false })
    estado:boolean;

    @OneToMany(()=> Vehiculo, (vehiculo) => vehiculo.color)
    vehiculos: Vehiculo;
}