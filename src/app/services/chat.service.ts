import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Mensaje } from '../models/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];

  constructor( private afs: AngularFirestore ) { }

  getMessages() {

    this.itemsCollection = this.afs.collection<Mensaje>('chats');

    return this.itemsCollection.valueChanges().pipe(
      map( (mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats = mensajes;
      })
    );
  }

  addMessage( msg: string ) {

    // TODO add userId (uid)
    const mensaje: Mensaje = {
      name: 'Demo',
      mensaje: msg,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add(mensaje);
  }
}
