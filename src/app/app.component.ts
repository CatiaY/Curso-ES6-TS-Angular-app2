import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app2';

  ngOnInit(): void {
    // Obter as informações no projeto salvo dentro do firebase > Comece adicionando o firebase a seu aplicativo
    // O firebase gerará o código a ser incluído aqui

    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyCZoOQaD088hqh2bSl3OlI_qFoRdWqeNys",
      authDomain: "jta-app2-passaro-urbano.firebaseapp.com",
      databaseURL: "https://jta-app2-passaro-urbano-default-rtdb.firebaseio.com",
      projectId: "jta-app2-passaro-urbano",
      storageBucket: "jta-app2-passaro-urbano.appspot.com",
      messagingSenderId: "214758644707",
      appId: "1:214758644707:web:28bb786d528a5039b39ed6"
    };
    firebase.initializeApp(firebaseConfig);
  }
}
