import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string = '';
  password: string = '';
  public signup: boolean;

  private dbpath = '/usuarios';

  usuarioIngresado: any;
  
  public formGroup: FormGroup;

  constructor(private fb: FormBuilder, public auth: AuthService) {
    // this.usuarioIngresado = this.authService.usuario;
    this.signup = false;

    this.formGroup = this.fb.group({
      'nombre':['', Validators.required],
      'apellido':['', Validators.required],
      'edad':['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni':['', Validators.required],
      'email':['', Validators.required],
      'password':['', Validators.required],
      'imagen':['', Validators.required]      
    });
  }

  ngOnInit(): void {
  }

  // public aceptar(): void {
  //   console.log(this.formGroup.getRawValue());
  // }
  // Registro(){
  //   this.signup = true;

  //   setTimeout(() => {
  //     this.signup = false;
  //   }, 3000);

  //   this.auth.Registro(this.email, this.password);
  //   this.email = this.password = '';
  // }

  public Registro(): void{
    console.log(this.formGroup.getRawValue());

    this.signup = true;

    setTimeout(() => {
      this.signup = false;
    }, 3000);

    this.auth.Registro(this.email, this.password);
    this.email = this.password = '';
  }

}
