import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'firechat2020';
  chats: Observable<any[]>;
  
  constructor(firestore: AngularFirestore, private _cs: ChatService) {
  }
}
