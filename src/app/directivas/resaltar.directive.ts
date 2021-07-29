import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {

  @Input('appResaltar') cantidad: number=0;

  constructor(private el: ElementRef) {
    // el.nativeElement.style.backgroundColor = 'yellow';
   }

   ngOnInit(){
    this.resaltar(this.cantidad);
   }

   private resaltar(cupo: number){
    console.log("2", cupo, this.el);
    if(cupo > 10 ){
      this.el.nativeElement.style.backgroundColor = 'orange';
    } else if(cupo > 5){
      console.log("1");
      this.el.nativeElement.style.backgroundColor = 'yellow';
    } else if(cupo > 0){
      console.log("3");
      this.el.nativeElement.style.backgroundColor = 'green';
    } 
   }
}
