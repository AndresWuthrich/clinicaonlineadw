import { DiasAtencion } from "./dias-atencion";
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
    horarioAtencion?: Array<DiasAtencion>;

    historiaClinica?: any = {
        altura: '',
        peso: '',
        temperatura: '',
        presion: '',
        clave1: '', 
        valor1: '',
        clave2: '', 
        valor2: ''
    };
}
