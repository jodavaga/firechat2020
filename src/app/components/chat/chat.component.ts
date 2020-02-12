import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje = '';

  constructor( private _chatService: ChatService ) { }

  ngOnInit() {
    this._chatService.getMessages().subscribe();
  }

  enviarMensaje() {

    if (this.mensaje.length === 0) {
      return;
    }

    this._chatService.addMessage(this.mensaje)
        .then( () => this.mensaje = '')
        .catch( (err) => console.error('Error al enviar mensaje', err) );
  }

}
