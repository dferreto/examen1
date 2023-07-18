import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehiculo } from "./Vehiculo";
import { IsNotEmpty, MaxLength } from "class-validator";

@Entity()
export class Marca{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: false })
    @MaxLength(25)
    @IsNotEmpty({message: "Falta el nombre de la marca"})
    nombre:string;

    @Column({ nullable: false })
    @IsNotEmpty({message: "Falta si es metalizado o no"})
    metalizado:boolean;

    @Column({ nullable: false })
    @IsNotEmpty()
    estado:boolean;

    @OneToMany(()=> Vehiculo, (vehiculo) => vehiculo.marca)
    vehiculos: Vehiculo;
}