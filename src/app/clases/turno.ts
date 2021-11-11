import { Especialidad } from "./especialidad";
import { Usuario } from "./usuario";

export class Turno {
    id: string = '';
    paciente: Usuario | null = null;
    especialista: Usuario | null = null;
    especialidad: Especialidad | null = null;
    estado: string = ''; //pendiente - aceptado - realizado - rechazado - cancelado
    diaTurno: string = '';
    horarioTurno: string = '';
    encuesta?: any = {
        prestaciones: '',
        recomendar: '',
        sugerencia: '',
        canal: ''
    };
    calificacionAtencion?: string = '';
    mensajeCalificacionAtencion?: string = '';
    comentarioAdmin?: string = '';
    comentarioPaciente?: string = '';
    comentarioEspecialista?: string = '';

    historiaClinica?: any = {
        altura: '',
        peso: '',
        temperatura: '',
        presion: '',
        clave1: '', 
        valor1: '',
        clave2: '', 
        valor2: '',
        clave3: '', 
        valor3: '',
        clave4: '', 
        valor4: '',
        clave5: '', 
        valor5: ''
    };}
