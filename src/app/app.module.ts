import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
// import { LoginComponent } from './pages/login/login.component';
// import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';

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
import { DetalleHistoriaClinicaComponent } from './pages/detalle-historia-clinica/detalle-historia-clinica.component';
import { MisTurnosEspecialistaComponent } from './pages/mis-turnos-especialista/mis-turnos-especialista.component';
import { MisHorariosComponent } from './pages/mis-horarios/mis-horarios.component';
import { TurnoCancelarComponent } from './componentes/turno-cancelar/turno-cancelar.component';
import { TurnoReseniaComponent } from './componentes/turno-resenia/turno-resenia.component';
import { TurnoCalificarAtencionComponent } from './componentes/turno-calificar-atencion/turno-calificar-atencion.component';
import { TurnoEncuestaComponent } from './componentes/turno-encuesta/turno-encuesta.component';
import { TurnoFinalizarComponent } from './componentes/turno-finalizar/turno-finalizar.component';
import { TurnoRechazarComponent } from './componentes/turno-rechazar/turno-rechazar.component';
import { HistoriaClinicaComponent } from './componentes/historia-clinica/historia-clinica.component';
import { TurnoInformesComponent } from './componentes/turno-informes/turno-informes.component';
import { InformesComponent } from './pages/informes/informes.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { ResaltarDirective } from './directivas/resaltar.directive';
import { UpperPipe } from './pipes/upper.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FiltroTurnosPipe } from './pipes/filtro-turnos.pipe';
import { ChartModule } from 'angular-highcharts';
import { FechaPipe } from './pipes/fecha.pipe';
import { SaludoDirective } from './directivas/saludo.directive';
// import { Ng2GoogleRecaptchaModule } from 'ng2-google-recaptcha';

PdfMakeWrapper.setFonts(pdfFonts);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http);
   return new TranslateHttpLoader(http, './assets/i18n/','.json');
}

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
    MisTurnosEspecialistaComponent,
    MisHorariosComponent,
    TurnoCancelarComponent,
    TurnoReseniaComponent,
    TurnoCalificarAtencionComponent,
    TurnoEncuestaComponent,
    TurnoFinalizarComponent,
    TurnoRechazarComponent,
    TurnoInformesComponent,
    InformesComponent,
    PacientesComponent,
    ResaltarDirective,
    UpperPipe,
    FiltroTurnosPipe,
    FechaPipe,
    SaludoDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    // Ng2GoogleRecaptchaModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [AuthService, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
