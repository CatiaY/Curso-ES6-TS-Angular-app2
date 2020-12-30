import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

import { OfertasService } from '../ofertas.service'
import { CarrinhoService } from '../carrinho.service'

import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})

export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta

  // Atributo para referenciar a interface ActivatedRoute deve ser declarado no Constructor. Ele servirá para obter parâmetros recebidos da rota via Snapshot  
  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {    
    // Recebimento do id por meio do subscribe. Ele envia a execução de uma promise no handle de execução
    this.route.params.subscribe((parametros: Params) => {      
      // Chama o serviço para obter os dados referentes ao id recebido. Combina Promise com Observable
      this.ofertasService.getOfertaPorId(parametros.id)
          .then(( oferta: Oferta ) => { this.oferta = oferta })
    }) 
  }

  ngOnDestroy(){
   
  }

  public adicionarItemCarrinho (): void {
   
    this.carrinhoService.incluirItem(this.oferta)    
  }
}
