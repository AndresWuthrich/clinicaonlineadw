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

    horarioAtencion?: any[];

    constructor() {
      this.perfil = 'especialista';
      this.especialidad = [];
      this.horarioAtencion = [
        {
          lunes: {
            estado: true,
            inicio: 800,
            fin: 1900,
            literal: 'LUNES',
            profesion: ''
          },
          martes: {
            estado: true,
            inicio: 800,
            fin: 1900,
            literal: 'MARTES',
            profesion: ''
          },
          miercoles: {
            estado: true,
            inicio: 800,
            fin: 1900,
            literal: 'MIERCOLES',
            profesion: ''
          },
          jueves: {
            estado: true,
            inicio: 800,
            fin: 1900,
            literal: 'JUEVES',
            profesion: ''
          },
          viernes: {
            estado: true,
            inicio: 800,
            fin: 1900,
            literal: 'VIERNES',
            profesion: ''
          },
          sabado: {
            estado: true,
            inicio: 800,
            fin: 1400,
            literal: 'SABADO',
            profesion: ''
          },
        },
      ];
    }
  
}
