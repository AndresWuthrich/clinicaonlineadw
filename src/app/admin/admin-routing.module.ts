import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnoComponent } from '../pages/turno/turno.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  // { path: '', component: AdminComponent }
  { path: 'turnos', component: TurnoComponent },
  // { path: 'resultados', component: ResultadosComponent },
  { path: '', redirectTo: 'turnos', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
