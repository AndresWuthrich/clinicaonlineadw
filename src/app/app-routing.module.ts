import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { EnvioEmailComponent } from './pages/envio-email/envio-email.component';
// import { LoginComponent } from './pages/login/login.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { MisHorariosComponent } from './pages/mis-horarios/mis-horarios.component';
import { MisTurnosEspecialistaComponent } from './pages/mis-turnos-especialista/mis-turnos-especialista.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// import { RegistroComponent } from './pages/registro/registro.component';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';
import { TurnoComponent } from './pages/turno/turno.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

const routes: Routes = [
  {path: 'bienvenido', component: BienvenidoComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'registro', component: RegistroComponent},
  {path: 'verificacion-email', component: EnvioEmailComponent},
  {path: 'usuarios', component: UsuarioComponent},
  {path: 'miperfil', component: MiPerfilComponent},
  {path: 'misturnos', component: MisTurnosComponent},
  {path: 'misturnos-especialista', component: MisTurnosEspecialistaComponent},
  {path: 'mishorarios', component: MisHorariosComponent},
  {path: 'solicitarturno', component: SolicitarTurnoComponent},
  // {path: 'turno', component: TurnoComponent},
  {path: '', redirectTo: 'bienvenido', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
