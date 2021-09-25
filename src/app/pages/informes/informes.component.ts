import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  public listaTurnos: Turno[] = [];
  public listaEspecialidades: Especialidad[] = [];
  public listaEspecialistas: Usuario[] = [];

  public cantidadTurnoEspecialidad: any | null;
  public cantidadTurnoEspecialista: any | null;
  public arrayCantidadTurnoEspecialidad: any[] = [];
  public arrayCantidadTurnoDia: any[] = [];
  public arrayCantidadTurnoEspecialista: any[] = [];

  public info2: boolean = false;
  public info3: boolean = false;
  public info4: boolean = false;

  constructor(private turnoService: TurnoService, private usuarioService: UsuarioService, private especialidadService: EspecialidadService) {
    this.turnoService.traerTodos().subscribe((turnos: Turno[]) => {
      this.listaTurnos = turnos;
      console.log('1',this.listaTurnos);
    });

    this.especialidadService.traerTodas().subscribe((especialidades: Especialidad[]) => {
      this.listaEspecialidades = especialidades;
      console.log('2',this.listaEspecialidades);
    });

    this.usuarioService.traerEspecialistas().subscribe((especialistas: Usuario[]) => {
      this.listaEspecialistas = especialistas;
      console.log('3',this.listaEspecialistas);
    });

   }

  ngOnInit(): void {
  }

  informe2(){
    this.info2 = true;
    this.info3 = false;
    this.info4 = false;

    var arrayEspecialidad: string[] = [];
    this.listaEspecialidades.forEach(especialidad => {
      arrayEspecialidad.push(especialidad.descripcion);
    });

    arrayEspecialidad.forEach(descripcion => {

      this.cantidadTurnoEspecialidad = {
        descripcion: descripcion,
        cantidad: 0,
      }
      this.listaTurnos.forEach(turno => {
        if (turno.especialidad!.descripcion == descripcion) {
          this.cantidadTurnoEspecialidad.cantidad++;
        }
      });
      this.arrayCantidadTurnoEspecialidad.push(this.cantidadTurnoEspecialidad);
      console.log('2',this.cantidadTurnoEspecialidad);

    });
  }

  informe3(){//NO ANDA
    this.info2 = false;
    this.info3 = true;
    this.info4 = false;

    var arrayEspecialidad: string[] = [];
    this.listaEspecialidades.forEach(especialidad => {
      arrayEspecialidad.push(especialidad.descripcion);
    });

    arrayEspecialidad.forEach(descripcion => {

      this.cantidadTurnoEspecialidad = {
        descripcion: descripcion,
        cantidad: 0,
      }
      this.listaTurnos.forEach(turno => {
        if (turno.especialidad!.descripcion == descripcion) {
          this.cantidadTurnoEspecialidad.cantidad++;
        }
      });
      this.arrayCantidadTurnoEspecialidad.push(this.cantidadTurnoEspecialidad);
      console.log('3',this.cantidadTurnoEspecialidad);

    });
  }

  informe4(){
    this.info2 = false;
    this.info3 = false;
    this.info4 = true;

    var arrayEspecialista: string[] = [];
    this.listaEspecialistas.forEach(especialista => {
      arrayEspecialista.push(especialista.apellido);
    });

    arrayEspecialista.forEach(apellido => {

      this.cantidadTurnoEspecialista = {
        apellido: apellido,
        cantidad: 0,
      }
      this.listaTurnos.forEach(turno => {
        if (turno.especialista!.apellido == apellido) {
          this.cantidadTurnoEspecialista.cantidad++;
        }
      });
      this.arrayCantidadTurnoEspecialista.push(this.cantidadTurnoEspecialista);
      console.log('4',this.cantidadTurnoEspecialista);

    });
  }

}
