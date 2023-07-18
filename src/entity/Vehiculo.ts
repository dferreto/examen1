import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Marca } from "./Marca";
import { Color } from "./Color";
import { Tipo_Vehiculo } from "./Tipo_Vehiculo";
import { IsDate, IsNotEmpty, MaxLength } from "class-validator";




@Entity()
export class Vehiculo{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique:true, nullable: false })
    @MaxLength(8, {message: "La placa debe ser de 8 caracteres"})
    @IsNotEmpty({message: "Falta la placa"})
    placa:string;

    @Column({ nullable: false })
    @IsNotEmpty({message: "Falta el id de la marca"})
    id_marca:number;
    @ManyToOne(()=> Marca, (marca)=> marca.vehiculos)
    @JoinColumn({name:"id_marca"})
    marca: Marca;

    @Column({ nullable: false })
    @IsNotEmpty({message: "Falta el id del color"})
    id_color:number;
    @ManyToOne(()=> Color, (color)=> color.vehiculos)
    @JoinColumn({name:"id_color"})
    color: Color;

    @Column({ nullable: false })
    @IsNotEmpty({message: "Falta el número de cilindraje"})
    cilindraje:number;

    @Column({ nullable: false })
    @IsNotEmpty({message: "Falta el id de tipo de vehiculo"})
    id_TipoVehiculo:number;
    @ManyToOne(()=> Tipo_Vehiculo, (tipo_vehiculo)=> tipo_vehiculo.vehiculos)
    @JoinColumn({name:"id_TipoVehiculo"})
    tipo_vehiculo: Tipo_Vehiculo;

    @Column({ nullable: false })
    @IsNotEmpty({message: "Falta la cantidad de pasajeros"})
    cantidadPasajeros:number;

    @Column({ nullable: false, type: 'date' })
    @IsNotEmpty({message: "Falta la fecha de ingreso"})
    fecha_ingreso:Date;

    @Column({ nullable: false } )
    estado:boolean;
    
}