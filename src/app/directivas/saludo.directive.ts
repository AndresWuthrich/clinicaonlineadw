import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSaludo]'
})
export class SaludoDirective {

  hora: any;
  constructor(private el: ElementRef, renderer: Renderer2) { 
    var dia = renderer.createText('Buen día,');
    var tarde = renderer.createText('Buenas tardes,');
    var noche = renderer.createText('Buenas noches,');
    this.hora = new Date().getHours();
    if(this.hora < 20 && this.hora > 12){     
      
      renderer.appendChild(el.nativeElement, tarde);     
    } else if(this.hora < 13 && this.hora > 4){
      renderer.appendChild(el.nativeElement, dia); 
    } else {
      renderer.appendChild(el.nativeElement, noche);
    }
  }
}
