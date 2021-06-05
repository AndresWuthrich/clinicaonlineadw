import { Especialidad } from "./especialidad";

export class Usuario {
    nombre: string = '';
    apellido: string = '';
    edad: number = 0;
    dni: number = 0;
    perfil: string = '';
    email: string = '';
    password: string = '';
    imagenPerfil?: string;
    imagenPerfil2?: string;
    uid?: string = '';
    obraSocial?: string = '';
    // especialidad?: string = '';
    especialidad?: Array<Especialidad>;
    cuentaAprobada?: boolean = false;
}
