import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PerfilDirective } from './directivas/perfil.directive';
import { TurnoComponent } from './pages/turno/turno.component';
import { EnvioEmailComponent } from './pages/envio-email/envio-email.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';
// import { Ng2GoogleRecaptchaModule } from 'ng2-google-recaptcha';
import { ExcelService } from './services/excel.service';


@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    UsuarioComponent,
    PageNotFoundComponent,
    PerfilDirective,
    TurnoComponent,
    EnvioEmailComponent,
    MiPerfilComponent,
    SolicitarTurnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    // Ng2GoogleRecaptchaModule
  ],
  providers: [AuthService, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
