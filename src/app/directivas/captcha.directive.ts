import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCaptcha]'
})
export class CaptchaDirective {


  @Input('appCaptcha') des: boolean=false;

  constructor(private el: ElementRef) {
    // el.nativeElement.style.backgroundColor = 'yellow';
   }

   ngOnInit(){
    this.resaltar(this.des);
   }

   private resaltar(desa: boolean){
    console.log("2", desa, this.el);
    if(desa == false ){
      this.el.nativeElement.style.backgroundColor = 'orange';
    } 
   }
  }
