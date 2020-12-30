import { Component, OnInit } from '@angular/core';
import { OfertasService} from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
  // Para injeção de serviços com escopo do componente e seus filhos
  providers: [ OfertasService ] // Recebe como valor um array com uma série de classes de serviços que estarão disponíveis no escopo do componente e seus filhos
})

export class HomeComponent implements OnInit {

  // Guardará as ofertas recebidas por meio do serviço
  public ofertas: Oferta[]

  // Cria a propriedade da variável que dará acesso ao serviço por meio do construtor, de forma implícita 
  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    // Indica qual atributo que receberá o serviço.
    // O serviço será acessado partir desse atributo 
    
    // Uso de Promise: .then executa uma ação quando a Promise estiver resolvida. Ele recebe o conteúdo de resolve da Promise dentro de uma Arrow Function
    this.ofertasService.getOfertas() 
      .then(        
        // Primeiro parâmetro de .then: deu certo (resolve)
        (ofertas: Oferta[]) => {           
          this.ofertas = ofertas }, // Recebe por parâmetro o return de resolve
        // Segundo parâmetro de .then: deu errado (reject). Porém, o usual é colocar essa instrução no .catch        
      )
      .catch((param: any) => { console.log(param)})
  }
}
