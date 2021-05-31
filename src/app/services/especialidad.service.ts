import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Especialidad } from '../clases/especialidad';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private dbPath = '/especialidades';
  itemsCollection: AngularFirestoreCollection<Especialidad>;
  public especialidades: Observable<Especialidad[]>;

  constructor(private afs: AngularFirestore, public auth: AuthService) {
    this.itemsCollection = this.afs.collection(this.dbPath);

    this.especialidades = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as unknown as Especialidad;
        return data;
      });
    }));
   }

   agregarEspecialidad(especialidad: Especialidad){
     return this.itemsCollection.add(JSON.parse(JSON.stringify(especialidad)));
   }
  
  traerTodas(){
    return this.especialidades;
  }
}
