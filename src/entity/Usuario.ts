import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryColumn} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class Usuario{
    @PrimaryColumn()
    @IsNotEmpty({message: "Falta la cédula'"})
    cedula:number;
    @Column()
    @MaxLength(50)
    @IsNotEmpty({message: "Falta el nombre"})
    nombre:string;
    @Column()
    @MaxLength(50)
    @IsNotEmpty({message: "Falta el primer apellido"})
    apellido1:string;
    @Column()
    @MaxLength(50)
    @IsNotEmpty({message: "Falta el segundo apellido"})
    apellido2:string;
    @Column({unique: true})
    @IsNotEmpty({message: "Falta el correo"})
    @IsEmail()
    correo:string;
    @Column()
    @MaxLength(30)
    @MinLength(5)
    @IsNotEmpty({message: "Falta la contraseña"})
    contrasena:string;
    @Column()
    @IsNotEmpty({message: "Falta el rol"})
    rol:string;
    @Column({default: true})
    estado:boolean;

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.contrasena = bcrypt.hashSync(this.contrasena, salt);
    }

    checkPassword(contra: string): boolean {
        return bcrypt.compareSync(contra, this.contrasena);
    }
}