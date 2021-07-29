import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upper'
})
export class UpperPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultado=[];

    for(const user of value){
      if(user.perfil.toUpperCase().indexOf(arg.toUpperCase()) > -1){
        resultado.push(user);
      } else{
        if(user.email.toUpperCase().indexOf(arg.toUpperCase()) > -1){
          resultado.push(user);
        }
      }
    }
    return resultado;
  }

}
