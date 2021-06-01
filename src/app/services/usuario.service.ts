import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { AuthService } from './auth.service';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private filePath: any;
  private dbPath = '/usuarios';
  // private downloadURL: Observable<string>;
  itemsCollection: AngularFirestoreCollection<Usuario>;
  public usuarios: Observable<Usuario[]>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, public auth: AuthService) {
    this.itemsCollection = this.afs.collection(this.dbPath);

    this.usuarios = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as unknown as Usuario;
        return data;
      });
    }));
   }

  //  agregarUsuario(nombre: string, apellido: string, edad: number, dni: number, perfil: string, email: string, password: string, imagen: string, imagen2: string, obraSocial: string, especialidad: string){
  agregarUsuario(usuario: Usuario){

    return this.itemsCollection.add(JSON.parse(JSON.stringify(usuario)));
  }

  agregarEspecialista(imagen: any, usuario: Usuario){
    this.filePath = `imagenes/${imagen.name}`;
    console.log(imagen.name);
    const fileRef = this.storage.ref(this.filePath);
    console.log(this.filePath);
    const task = this.storage.upload(this.filePath, imagen);
    console.log(imagen);
    task.snapshotChanges().pipe(finalize(()=>{
      fileRef.getDownloadURL().subscribe(urlImagen =>{
        console.log('URL_IMAGEN', urlImagen);

        // this.guardarPeliculaConFoto(pelicula, urlImagen);
        usuario.imagenPerfil = urlImagen;
        console.log("hola" + usuario);
        return this.itemsCollection.add(JSON.parse(JSON.stringify(usuario)));
      })
    })).subscribe();
  }

  agregarPaciente(imagen: any, imagen2: any, usuario: Usuario){
    this.filePath = `imagenes/${imagen.name}`;
    console.log(imagen.name);
    const fileRef = this.storage.ref(this.filePath);
    console.log(this.filePath);
    const task = this.storage.upload(this.filePath, imagen);
    console.log(imagen);
    task.snapshotChanges().pipe(finalize(()=>{
      fileRef.getDownloadURL().subscribe(urlImagen =>{
        console.log('URL_IMAGEN', urlImagen);

        // this.guardarPeliculaConFoto(pelicula, urlImagen);
        usuario.imagenPerfil = urlImagen;
        // console.log("hola" + usuario);
        // return this.itemsCollection.add(JSON.parse(JSON.stringify(usuario)));
      })
    })).subscribe();

    this.filePath = `imagenes/${imagen2.name}`;
    console.log(imagen2.name);
    const fileRef2 = this.storage.ref(this.filePath);
    console.log(this.filePath);
    const task2 = this.storage.upload(this.filePath, imagen2);
    console.log(imagen2);
    task2.snapshotChanges().pipe(finalize(()=>{
      fileRef2.getDownloadURL().subscribe(urlImagen2 =>{
        console.log('URL_IMAGEN2', urlImagen2);

        // this.guardarPeliculaConFoto(pelicula, urlImagen);
        usuario.imagenPerfil2 = urlImagen2;
        console.log("hola" + usuario);
        return this.itemsCollection.add(JSON.parse(JSON.stringify(usuario)));
      })
    })).subscribe();

  }

  traerEspecialistas(){
    return this.usuarios.pipe(map(value => { return value.filter(user => { return user.perfil == "especialista";
  });
  }));
  }

  traerTodos(){
    return this.usuarios;
  }

  async obtenerDocumentoUsuario(user: Usuario) {
    var value = await this.afs.collection(this.dbPath).ref.where('email', '==', user.email).get();
    if (value.docs[0].exists) {
      return value.docs[0].id;
    }
    else {
      return null;
    }
  }

  async obtenerUsuarioPorEmail(email: string) {
    return new Promise((resolve, reject) => {this.afs.collection(this.dbPath).get().subscribe((querySnapshot) => {
      let doc = querySnapshot.docs.find(doc => (doc.data() as Usuario).email == email);
      resolve(doc?.data());
      console.log(doc);
    })
    });
  }

  async actualizarCuentaAprobada(documento: any, aprobar: boolean){
    var usuario = this.afs.collection(this.dbPath).doc(documento);

    return usuario.update({
      cuentaAprobada: aprobar
    }).then(() => {
      Swal.fire({
        title: 'Cambio de estado exitoso'
      });
    }).catch((error) => {
      Swal.fire({
        title: error.code,
        text: error.message
      });
    });
  }
}
