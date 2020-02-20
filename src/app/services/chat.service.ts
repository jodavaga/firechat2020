import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { map } from 'rxjs/operators';

import { Mensaje } from '../models/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor( private afs: AngularFirestore, public afAuth: AngularFireAuth ) { 

    this.afAuth.authState.subscribe( user => {
      console.log(user);

      if (!user) {
        return;
      }
      this.usuario.name = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  // Authentication usign angularFirebase

  login( proveedor: string ) {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.usuario = {};
    this.afAuth.signOut();
  }

  // Getting messages from firebase database

  getMessages() {

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));

    return this.itemsCollection.valueChanges().pipe(
      map( (mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats = [];

        for (let mensaje of mensajes) {
          // Insert cada mensaje en la posicion 0 del array
          this.chats.unshift(mensaje);
        }

        return this.chats;
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
