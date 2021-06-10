import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { DiasAtencion } from '../clases/dias-atencion';

@Injectable({
  providedIn: 'root'
})
export class DiaService {

  private dbPath = '/dias';
  itemsCollection: AngularFirestoreCollection<DiasAtencion>;
  public diasAtencion: Observable<DiasAtencion[]>;

  constructor(private afs: AngularFirestore, public auth: AuthService) {
    this.itemsCollection = this.afs.collection(this.dbPath);

    this.diasAtencion = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as unknown as DiasAtencion;
        return data;
      });
    }));
   }

   agregarDia(dia: DiasAtencion){
     return this.itemsCollection.add(JSON.parse(JSON.stringify(dia)));
   }
  
  traerTodos(){
    return this.diasAtencion;
  }
}
