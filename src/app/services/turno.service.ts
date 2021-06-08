import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Turno } from '../clases/turno';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private dbPath = '/turnos';
  itemsCollection: AngularFirestoreCollection<Turno>;
  public turnos: Observable<Turno[]>;

  constructor(private afs: AngularFirestore, public auth: AuthService) {
    this.itemsCollection = this.afs.collection(this.dbPath);

    this.turnos = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as unknown as Turno;
        return data;
      });
    }));
   }

   agregarTurno(turno: Turno){
     return this.itemsCollection.add(JSON.parse(JSON.stringify(turno)));
   }
 
   traerTurnosPacientePorUid(uid:string) {
    return this.turnos.pipe(map(dato => {
      return dato.filter(turno => {
        return turno.paciente!.uid == uid;
      });
    }));
  }
 
  traerTurnosEspecialistaPorUid(uid:string) {
    return this.turnos.pipe(map(dato => {
      return dato.filter(turno => {
        return turno.especialista!.uid == uid;
      });
    }));
  }

  traerTodos(){
    return this.turnos;
  }
}
