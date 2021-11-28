import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  public mesCompleto: string = ''; 

  transform(value: any, ...args: unknown[]): unknown {
    // const resultadoFecha = [];
    // return resultadoFecha;

    var diaP = value;
    console.log(diaP);

    var diaaP =    diaP.substring(0,3);
    var mesaP =    diaP.substring(4,7);
    var nroaP =    diaP.substring(8,10);
    var anoaP =    diaP.substring(11,15);

    console.log(diaaP);
    console.log(mesaP);
    console.log(nroaP);
    console.log(anoaP);

    // let mes:string;
    // let fecha=value.toString();
    
    // if(fecha.substr(8,1)=="0"){
    //   dia=fecha.substr(9,1);
    // }else{
    //   dia=fecha.substr(8,2);
    // }
    
    // console.log(fecha);
    // console.log(value.getMonth());
    
    switch(mesaP){

      case "Ene" || "Jan":
        this.mesCompleto="Enero"
        break;
      case "Feb":
        this.mesCompleto="Febrero"
        break;
      case "Mar":
        this.mesCompleto="Marzo"
        break;
      case "Abr" || "Apr":
        this.mesCompleto="Abril"
        break;
      case "May":
        this.mesCompleto="Mayo"
        break;
      case "Jun":
        this.mesCompleto="Junio"
        break;
      case "Jul":
        this.mesCompleto="Julio"
        break;  
      case "Aug" || "Ago":
        this.mesCompleto="Agosto"
        break;
      case "Sep":
        this.mesCompleto="Septiembre"
        break;
      case "Oct":
        this.mesCompleto="Octubre"
        break;
      case "Nov" || "Niv":
        this.mesCompleto="Noviembre"
        break;
      case "Dic" || "Dec":
        this.mesCompleto="Diciembre"
        break;
    }
    var cadena=(nroaP + " de " + this.mesCompleto + " de " + anoaP);
    return cadena;
    // return diaP;
  }
}
