import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../../ofertas.service'

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [ OfertasService ]
})

export class OndeFicaComponent implements OnInit {

  public ondeFica: string = ''

  constructor( 
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit(): void {

    // Subscribe nos parâmetros da rota parent. Com o snapshot eles só são atualizados se o componente for destruído, por isso o subscribe é necessário
    this.route.parent.params.subscribe((parametros: Params) => {
      this.ofertasService.getOndeFicaOfertaPorId(parametros.id)
      .then((resposta: string) => { this.ondeFica = resposta } )
    })    
  }

}
