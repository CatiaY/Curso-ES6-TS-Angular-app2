import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})

export class RestaurantesComponent implements OnInit {

  public ofertas: Oferta[]

  // Teste para a utilização do pipe date. Precisa receber uma variável do tipo Date. 
  // Obs.: Janeiro = 0
  public dataTest: any = new Date(2020, 10, 28)

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertasService.getOfertasPorCategoria('restaurante')
    .then((ofertas: Oferta[]) => this.ofertas = ofertas)
  }
}