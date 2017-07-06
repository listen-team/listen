import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'idea-main',
  templateUrl: './idea-main.component.html'
})
export class IdeaMainComponent implements OnInit {

  exposicion: string;
  efecto: string;
  beneficio: string;
  formulalegal: string;
  title: string;

  constructor(private socket: SocketService ) { }

  ngOnInit() {
    this.socket.connectSocket();

    this.socket.receiveConnections().subscribe(response => {
      console.log(`Hay ${response.numbers} conexiones activas`);
      // alert(`Hay ${response.numbers} conexiones activas`);
    });

    
  }

  

  
  onClick(event){

  let tabs = Array.prototype.slice.apply(document.querySelectorAll('.tabs-item'));
  let panels = Array.prototype.slice.apply(document.querySelectorAll('.panels-item'));

  document.getElementById('tabs').addEventListener('click', e => {
    if(event.target.classList.contains('tabs-item')){
      let i = tabs.indexOf(event.target);
      tabs.map(tab => tab.classList.remove('active'));
      tabs[i].classList.add('active');
      panels.map(panel => panel.classList.remove('active'));
      panels[i].classList.add('active');
    }
  });

}

    onTitleClick(){
      const s = document.getElementById('title');
    this.socket.sendTitle(s.innerHTML.trim());

    this.socket.receiveTitle().subscribe(response => {
      s.innerHTML = response;
      // console.log(response);
    });
}


  onKeyExposicion(){
    this.socket.sendMessage(this.exposicion);
    
    this.socket.receiveMessages().subscribe(response => {
      this.exposicion = response;
      // console.log(response);
    });
  }

  onKeyEfecto(){
    
    this.socket.sendMessage1(this.efecto);
    // console.log("hola",this.efecto);
    this.socket.receiveMessages1().subscribe(response => {
      this.efecto = response;
      // console.log(response);
    });
  }

  onKeyBeneficio(){
    this.socket.sendMessage2(this.beneficio);

    this.socket.receiveMessages2().subscribe(response => {
      this.beneficio = response;
      // this.efecto = response;
      // this.beneficio = response;
      // this.formulalegal = response;
      // console.log(response);
    });
  }

  onKeyFormula(){
    this.socket.sendMessage3(this.formulalegal);

    this.socket.receiveMessages3().subscribe(response => {
      this.formulalegal = response;
      // console.log(response);
    });
  }

}
