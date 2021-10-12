import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})

export class BienvenidoComponent implements OnInit {

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;
  public usuarioLogueado: Usuario | null = null;

  langs: string[] = [];

  constructor(private usuarioService: UsuarioService, public auth: AuthService, public translate: TranslateService) {
            
            translate.setDefaultLang('es'); // // this language will be used as a fallback when a translation isn't found in the current language
            translate.use('es'); // // the lang to use, if the lang isn't available, it will use the current loader to get them
            translate.addLangs(['es','en','po']); //cargo arrays
            this.langs = this.translate.getLangs(); //puedo obtener los idiomas cargados en el array

            }

  async ngOnInit() {

    var user = await this.auth.usuario;
    // var user = await this.auth.getCurrentUser();
    if (user?.email != null && user) {
      console.log(user.email);
      var dataUser: any = await this.usuarioService.obtenerUsuarioPorEmail(user.email);
      console.log(dataUser);
      this.usuarioLogueado = dataUser;
    }
  }

  changeLang(lang: string){
    this.translate.use(lang); //le paso qué idioma utilizar
  }
}
