import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading: boolean;
  email: string = '';
  password: string = '';

  constructor(public auth: AuthService) {
    this.loading = false;
   }

  ngOnInit(): void {
  }

  Ingresar(){
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 3000);

    this.auth.Ingresar(this.email, this.password);
    // this.email=this.password="";

    // if(this.auth.errorLogin){
    //   Swal.fire({
    //     title: this.auth.errorLogin
    //   });
    //   }
  }

  Autocompletar(){
    this.email="andreswuthrich82@gmail.com";
    this.password="adw1982";
  }
}
