import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import * as firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: any;
  public errorRegistro: String = '';
  public errorLogin: String = '';

  constructor(public fireStoreAuth: AngularFireAuth, private router: Router) {

    this.usuario = fireStoreAuth.authState;

    this.usuario = fireStoreAuth.authState.subscribe(user =>{
      this.usuario.email = user?.email;
      this.usuario.uid = user?.uid;
    });
   }

  async sendVerificationEmail():Promise<void>{
    return (await this.fireStoreAuth.currentUser)?.sendEmailVerification();
  }

  async  Registro(email: string, password: string){
    this.fireStoreAuth.createUserWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Registro exitoso');
      this.sendVerificationEmail();
      // this.router.navigate(['bienvenido']);
    })
    .catch(error =>  {
      //this.errorRegistro = error.message;

      Swal.fire({
        title: error.code,
        text: error.message
      });

      // this.router.navigate(['error']);
    });
  }

  async Ingresar(email: string, password: string){
  //    this.fireStoreAuth
  //   .signInWithEmailAndPassword(email, password)
  //   .then(value =>{
  //     console.log("Ingreso exitoso");
      
  //     // this.router.navigate(['bienvenido']);
  //   })
  //   .catch(error =>  {
  //     this.errorLogin = error.message;

  //     Swal.fire({
  //       title: error.code,
  //       text: error.message
  //     });
  //   });
  // }
  
  try{
  const resultado = await this.fireStoreAuth
  .signInWithEmailAndPassword(email, password);
  // .then(value =>{
  //   console.log("Ingreso exitoso");
    
  //   // this.router.navigate(['bienvenido']);
  // })
    
  if(resultado.user?.emailVerified==false){
    console.log('Envio de verificacion exitoso');
    this.sendVerificationEmail();
  }
  
  return resultado;
  }catch(error)  {
  // //   this.errorLogin = error.message;
     console.log(error);

    Swal.fire({
      title: error.code,
      text: error.message
    });
  return error;
  //   // this.router.navigate(['error']);
  } 
}

  Logout(){
    this.fireStoreAuth.signOut();
    this.router.navigate(['login']);
  }
}