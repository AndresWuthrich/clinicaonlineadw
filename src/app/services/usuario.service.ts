import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { AuthService } from './auth.service';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';


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

  traerTodos(){
    return this.usuarios;
  }
}
