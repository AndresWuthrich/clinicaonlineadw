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
  img1: any;
  img2: any;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, public auth: AuthService) {
    this.itemsCollection = this.afs.collection(this.dbPath);

    this.usuarios = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as unknown as Usuario;
        return data;
      });
    }));
   }

  agregarUsuario(usuario: Usuario){

    return this.itemsCollection.add(JSON.parse(JSON.stringify(usuario)));
  }

  agregarEspecialista(imagen: any, usuario: Usuario){

    this.uploadImagen('imagenPerfil', imagen, usuario);
        
    // this.filePath = `imagenes/${imagen.name}`;
    // console.log(imagen.name);
    // const fileRef = this.storage.ref(this.filePath);
    // console.log(this.filePath);
    // const task = this.storage.upload(this.filePath, imagen);
    // console.log(imagen);
    // task.snapshotChanges().pipe(finalize(()=>{
    //   fileRef.getDownloadURL().subscribe(urlImagen =>{
    //     console.log('URL_IMAGEN', urlImagen);

        // this.guardarPeliculaConFoto(pelicula, urlImagen);
        // usuario.imagenPerfil = urlImagen;
        // console.log("alta" + usuario);
        // return this.itemsCollection.add(JSON.parse(JSON.stringify(usuario)));
    //   })
    // })).subscribe();
  }

  async  agregarPaciente(imagen: any, imagen2: any, usuario: Usuario){

    this.uploadImagen('imagenPerfil', imagen, usuario);

    // this.filePath = `imagenes/${imagen.name}`;
    // console.log(imagen.name);
    // const fileRef = this.storage.ref(this.filePath);
    // console.log(this.filePath);
    // const task = this.storage.upload(this.filePath, imagen);
    // console.log(imagen);
    // task.snapshotChanges().pipe(finalize(()=>{
    //   fileRef.getDownloadURL().subscribe(urlImagen =>{
    //     console.log('URL_IMAGEN', urlImagen);

    //     // this.guardarPeliculaConFoto(pelicula, urlImagen);
    //     usuario.imagenPerfil = urlImagen;
        // console.log("hola" + usuario);
        // return this.itemsCollection.add(JSON.parse(JSON.stringify(usuario)));
    //   })
    // })).subscribe();

    this.uploadImagen('imagenPerfil2', imagen2, usuario);

    // this.filePath = `imagenes/${imagen2.name}`;
    // console.log(imagen2.name);
    // const fileRef2 = this.storage.ref(this.filePath);
    // console.log(this.filePath);
    // const task2 = this.storage.upload(this.filePath, imagen2);
    // console.log(imagen2);
    // task2.snapshotChanges().pipe(finalize(()=>{
    //   fileRef2.getDownloadURL().subscribe(urlImagen2 =>{
    //     console.log('URL_IMAGEN2', urlImagen2);

    //     // this.guardarPeliculaConFoto(pelicula, urlImagen);
    //     usuario.imagenPerfil2 = urlImagen2;
    //     // console.log("hola" + usuario);
    //     // return this.itemsCollection.add(JSON.parse(JSON.stringify(usuario)));
    //   })
    // })).subscribe();
    // usuario.imagenPerfil = this.img1;
    // usuario.imagenPerfil2 = this.img2;
    // console.log("hola" + usuario.uid);
    // console.log("hola" + usuario.imagenPerfil);
    // console.log("hola" + usuario.imagenPerfil2);

    // this.agregarUsuario(usuario);
    // return this.itemsCollection.add(JSON.parse(JSON.stringify(usuario)));
  }

  uploadImagen(imagenPerfil: string, imagen: any, usuario: Usuario){
    this.filePath = `imagenes/${usuario.uid}/${imagen.name}`;
    console.log(imagen.name);
    const fileRef = this.storage.ref(this.filePath);
    console.log(this.filePath);
    const task = this.storage.upload(this.filePath, imagen);
    console.log(imagen);
    task.snapshotChanges().pipe(finalize(()=>{
      fileRef.getDownloadURL().subscribe(urlImagen =>{
        console.log('URL_IMAGEN', urlImagen);
        if(imagenPerfil == 'imagenPerfil'){
          this.img1 = urlImagen;
          console.log("URL1" + this.img1);
          console.log("perf" + usuario.perfil);

          usuario.imagenPerfil = urlImagen;
          if(usuario.perfil == 'especialista' || usuario.perfil == 'administrador'){
            this.agregarUsuario(usuario);
          }
          // usuario.imagenPerfil = urlImagen;
          // console.log("URL1" + usuario.imagenPerfil);
        } else{
          this.img2 = urlImagen;
          console.log("URL2" + this.img2);
          console.log("perf" + usuario.perfil);

          usuario.imagenPerfil2 = urlImagen;
          if(usuario.perfil == 'paciente'){
            this.agregarUsuario(usuario);
          }
          // usuario.imagenPerfil2 = urlImagen;
          // console.log("URL2" + usuario.imagenPerfil2);
        }
        })
    })).subscribe();
  }

  traerEspecialistas(){
    return this.usuarios.pipe(map(value => 
      { return value.filter(user => 
       { return user.perfil == "especialista"; });
    }));
  }

  traerPacientes(){
    return this.usuarios.pipe(map(value => 
      { return value.filter(user => 
       { return user.perfil == "paciente"; });
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
