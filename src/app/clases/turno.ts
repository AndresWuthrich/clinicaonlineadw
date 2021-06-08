import { Especialidad } from "./especialidad";
import { Usuario } from "./usuario";

export class Turno {
    uidEspecialista: string = '';
    paciente: Usuario | null = null;
    especialista: Usuario | null = null;
    especialidad: Especialidad | null = null;
    estado: string = ''; //aceptado - realizado - rechazado - cancelado
    diaTurno: string = '';
    horarioTurno: string = '';
    // comentario: string = '';
    // encuesta: string = '';
    encuesta: any = {
        atencionRecibida: ''//,
        // servicioOnline: '',
        // estadoEstablecimiento: '',
        // recomiendaClinida: ''
    };
    comentarioAdmin: string = '';
    comentarioPaciente: string = '';
    comentarioEspecialista: string = '';
    historiaClinica: any = {
        altura: '',
        peso: '',
        temperatura: '',
        presion: '',
        datosDinamicos: [
            {clave: '', valor: ''},
            {clave: '', valor: ''},
            {clave: '', valor: ''}
        ]
    };
}
