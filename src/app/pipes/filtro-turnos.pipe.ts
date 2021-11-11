import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTurnos'
})
export class FiltroTurnosPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultadoTurnos = [];

    for(const turno of value) {
      if(turno.paciente!.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1 ){
        resultadoTurnos.push(turno);
      }
      else{
        if(turno.paciente!.apellido.toLowerCase().indexOf(args.toLowerCase()) > -1 ){
          resultadoTurnos.push(turno);
        }  
      
        else{
          if(turno.especialidad!.descripcion.toLowerCase().indexOf(args.toLowerCase()) > -1 ){
            resultadoTurnos.push(turno);
          }

          else{
            if(turno.especialista!.apellido.toLowerCase().indexOf(args.toLowerCase()) > -1 ){
              resultadoTurnos.push(turno);
            }  

            else{
              if(turno.especialista!.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1 ){
                resultadoTurnos.push(turno);
              }  

              else{
                if(turno.estado.toLowerCase().indexOf(args.toLowerCase()) > -1 ){
                  resultadoTurnos.push(turno);
                }  
              }
            }
          }
        }
      }      
    }
    return resultadoTurnos;
  }

}
