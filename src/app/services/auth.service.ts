import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import * as firebase from 'firebase/app';

// import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: any;
  public errorRegistro: String = '';

  // constructor(public fireStoreAuth: AngularFireAuth, private router: Router) {

  constructor(private router: Router) {
    // this.usuario = fireStoreAuth.authState;

    // this.usuario = fireStoreAuth.authState.subscribe(user =>{
    //   this.usuario.email = user?.email;
    //   this.usuario.uid = user?.uid;
    // });
   }

  Registro(email: string, password: string){
    // this.fireStoreAuth.createUserWithEmailAndPassword(email, password)
    // .then(value => {
    //   // console.log('Registro exitoso');
    //   this.router.navigate(['bienvenido']);
    // })
    // .catch(error =>  {
    //   this.errorRegistro = error.message;
    //   // this.router.navigate(['error']);
    // }
    //)
    ;

  }

  Ingresar(email: string, password: string){
    // this.fireStoreAuth
    // .signInWithEmailAndPassword(email, password)
    // .then(value =>{
    //   console.log("Ingreso exitoso");
    //   this.router.navigate(['bievenido']);
    // })
    ;
  }

  Logout(){
    // this.fireStoreAuth.signOut();
    this.router.navigate(['login']);
  }
}