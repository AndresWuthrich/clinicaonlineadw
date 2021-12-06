import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UpperPipe } from 'src/app/pipes/upper.pipe';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  email: string = '';
  password: string = '';
  // mensaje: Mensaje = new Mensaje();
  langs: string[] = [];
  
  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;
  
  constructor(public auth: AuthService, public translate: TranslateService) { 
    translate.setDefaultLang('es'); // // this language will be used as a fallback when a translation isn't found in the current language
    translate.use('es'); // // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.addLangs(['es','en','po']); //cargo arrays
    this.langs = this.translate.getLangs(); //puedo obtener los idiomas cargados en el array
  }
  
  ngOnInit(): void {
  }
  
  Logout(){
    this.auth.Logout();
  }
 
  changeLang(lang: string){
    this.translate.use(lang); //le paso qué idioma utilizar
  }}
