import { Component, OnInit, ElementRef } from '@angular/core';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje = '';
  element;

  constructor( private _chatService: ChatService ) {

    this._chatService.getMessages().subscribe( () => {
      setTimeout( () => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 20);
    });

  }

  ngOnInit() {
    this.element = document.getElementById('app-mensajes');
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
