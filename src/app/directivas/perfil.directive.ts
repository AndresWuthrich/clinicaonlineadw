import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPerfil]'
})
export class PerfilDirective {

  @Input('appPerfil') perfilUsuario: string='';

  constructor(public el: ElementRef, public renderer: Renderer2) {
    // el.nativeElement.style.backgroundColor = 'yellow';
   }

   ngOnInit(){
    this.perfil(this.perfilUsuario);
   }

   private perfil(perUsu: string){
    if(perUsu == 'administrador' ){
      this.renderer.setStyle(this.el.nativeElement,'background-image','url("../../../assets/imagenes/back4.jpg")');
      console.log("2", perUsu, this.el.nativeElement);

    } else if(perUsu == 'paciente' ){
      console.log("1");
      this.renderer.setStyle(this.el.nativeElement,'background-image','url("../../../assets/imagenes/paciente.jpg")');
      // this.el.nativeElement.style.backgroundColor = 'yellow';

    } else {
      console.log("3");
      this.renderer.setStyle(this.el.nativeElement,'background-image','url("../../../assets/imagenes/back1.jpg")');
      // this.el.nativeElement.style.backgroundColor = 'green';
    } 
   }
}
