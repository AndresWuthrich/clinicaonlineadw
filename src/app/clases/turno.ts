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
        //atencionRecibida: ''//,
        recomendar: '',
        sugerencia: ''
    };
    calificacionAtencion?: string = '';
    mensajeCalificacionAtencion?: string = '';
    comentarioAdmin?: string = '';
    comentarioPaciente?: string = '';
    comentarioEspecialista?: string = '';
    // historiaClinica?: any = {
    //     altura: '',
    //     peso: '',
    //     temperatura: '',
    //     presion: '',
    //     datosDinamicos: [
    //         {clave: '', valor: ''},
    //         {clave: '', valor: ''},
    //         {clave: '', valor: ''}
    //     ]
    // };
}
