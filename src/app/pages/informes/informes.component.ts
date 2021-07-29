import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { Turno } from 'src/app/clases/turno';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  public listaTurnos: Turno[] = [];
  public listaEspecialidades: Especialidad[] = [];

  public cantidadTurnoEspecialidad: any | null;
  public arrayCantidadTurnoEspecialidad: any[] = [];

  public info2: boolean = false;

  constructor(private turnoService: TurnoService, private especialidadService: EspecialidadService) {
    this.turnoService.traerTodos().subscribe((turnos: Turno[]) => {
      this.listaTurnos = turnos;
      console.log('1',this.listaTurnos);
    });

    this.especialidadService.traerTodas().subscribe((especialidades: Especialidad[]) => {
      this.listaEspecialidades = especialidades;
      console.log('2',this.listaEspecialidades);
    });

   }

  ngOnInit(): void {
  }

  informe2(){
    this.info2 = true;

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

}
