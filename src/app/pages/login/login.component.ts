import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  Ingresar(){
    this.auth.Ingresar(this.email, this.password);
    // this.email=this.password="";
  }

  Autocompletar(){
    this.email="andreswuthrich82@gmail.com";
    this.password="adw1982";
  }
}
