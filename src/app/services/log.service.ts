import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Log } from '../clases/log';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private dbPath = '/logs';
  itemsCollection: AngularFirestoreCollection<Log>;
  public logs: Observable<Log[]>;

  constructor(private afs: AngularFirestore, public auth: AuthService) {
    this.itemsCollection = this.afs.collection(this.dbPath);

    this.logs = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as unknown as Log;
        return data;
      });
    }));
   }

   agregarLog(log: Log){
     return this.itemsCollection.add(JSON.parse(JSON.stringify(log)));
   }
  
  traerTodos(){
    return this.logs;
  }
}
