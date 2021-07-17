import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
// import { LoginComponent } from './login/login.component';
// import { RegistroComponent } from './registro/registro.component';


@NgModule({
  declarations: [
    AuthComponent
    // LoginComponent,
    // RegistroComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
