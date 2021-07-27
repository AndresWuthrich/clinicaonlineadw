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
 
  traerTurnosAdmin() {
    return this.turnos.pipe(map(dato => {
      return dato.filter(turno => {
        return turno.estado == "Pendiente";
      });
    }));
  }

  traerTodos(){
    return this.turnos;
  }

  async obtenerDocumentoTurno(turno: Turno) {
    var value = await this.afs.collection(this.dbPath).ref.where('id', '==', turno.id).get();
    if (value.docs[0].exists) {
      return value.docs[0].id;
    }
    else {
      return null;
    }
  }

  updateComentario(id: any, turno: Turno) {
    var tur = this.afs.collection(this.dbPath).doc(id);

    return tur.update({
      estado: turno.estado,
      comentarioPaciente: turno.comentarioPaciente,
      comentarioEspecialista: turno.comentarioEspecialista,
    }).then(() => {
        console.log("Documento actualizado!");
      })
      .catch((error) => {
        console.error("Error en la actualizacion: ", error);
      });
  }

  updateEncuesta(id: any, turno: Turno) {
    var tur = this.afs.collection(this.dbPath).doc(id);

    console.log("tur",tur);
    return tur.update({
      encuesta: turno.encuesta
    }).then(() => {
        console.log("Encuesta actualizada!");
      })
      .catch((error) => {
        console.error("Error en la actualizacion: ", error);
      });
  }

  updateAtencion(id: any, turno: Turno) {
    var tur = this.afs.collection(this.dbPath).doc(id);

    console.log("tur",tur);
    return tur.update({
      calificacionAtencion: turno.calificacionAtencion,
      mensajeCalificacionAtencion: turno.mensajeCalificacionAtencion
    }).then(() => {
        console.log("Atencion actualizada!");
      })
      .catch((error) => {
        console.error("Error en la actualizacion: ", error);
      });
  }
}
