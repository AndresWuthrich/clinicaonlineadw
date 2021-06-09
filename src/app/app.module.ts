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
import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { ExcelService } from './services/excel.service';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { HistoriaClinicaComponent } from './pages/historia-clinica/historia-clinica.component';
import { DetalleHistoriaClinicaComponent } from './pages/detalle-historia-clinica/detalle-historia-clinica.component';
import { MisTurnosEspecialistaComponent } from './pages/mis-turnos-especialista/mis-turnos-especialista.component';


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
    SolicitarTurnoComponent,
    MisTurnosComponent,
    HistoriaClinicaComponent,
    DetalleHistoriaClinicaComponent,
    MisTurnosEspecialistaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [AuthService, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
