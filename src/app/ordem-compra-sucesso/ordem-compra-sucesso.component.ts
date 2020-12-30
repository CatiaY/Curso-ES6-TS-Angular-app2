import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ordem-compra-sucesso',
  templateUrl: './ordem-compra-sucesso.component.html',
  styleUrls: ['./ordem-compra-sucesso.component.css']
})

export class OrdemCompraSucessoComponent implements OnInit {

  // Como o nome do atributo é o mesmo da propriedade recebida, não há necessidade de passar um apelido para a função Input('apelido')
  @Input() public idPedidoCompra: number

  constructor() { }

  ngOnInit(): void {
  }

}
