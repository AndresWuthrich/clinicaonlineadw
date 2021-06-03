import { Especialidad } from "./especialidad";
import { Usuario } from "./usuario";

export class Turno {
    paciente: Usuario | null = null;
    especialista: Usuario | null = null;
    especialidad: Especialidad | null = null;
    estado: string = ''; //aceptado - realizado - rechazado - cancelado
    diaTurno: string = '';
    horarioTurno: string = '';
    comentario: string = '';
    encuesta: string = '';
    comentarioAdmin: string = '';
    comentarioPaciente: string = '';
    comentarioEspecialista: string = '';
}
