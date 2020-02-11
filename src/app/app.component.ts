import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'firechat2020';
  chats: Observable<any[]>;
  
  constructor(firestore: AngularFirestore) {
    this.chats = firestore.collection('chats').valueChanges();
  }
}
