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
//   template: `
//   <div>{{ 'HELLO' | translate:param }}</div>
// `
})
export class BienvenidoComponent implements OnInit {

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;
  public usuarioLogueado: Usuario | null = null;

  param = {value: 'world'};

  constructor(private usuarioService: UsuarioService, public auth: AuthService, public translate: TranslateService) {
            // // this language will be used as a fallback when a translation isn't found in the current language
            // translate.setDefaultLang('sp');
            // // the lang to use, if the lang isn't available, it will use the current loader to get them
            // translate.use('sp');

            // translate.setTranslation('sp', {
            //   HELLO: 'hello {{value}}'
            // }); 
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
}
