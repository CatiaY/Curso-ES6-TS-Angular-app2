import { Component, OnInit } from '@angular/core';

// Para uso do Reactive Forms
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { OrdemCompraService } from '../ordem-compra.service'
import { CarrinhoService } from '../carrinho.service'
import { Pedido } from '../shared/pedido.model'
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: []
})

export class OrdemCompraComponent implements OnInit {

  // Deve-se passar formsControls (elementos do formulário) para dentro do objeto FormGroup (o formulário em si)  
  // FormControl(valor inicial, array de validadores, array de validadores assíncronos)
  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    'numero': new FormControl(null, [ Validators.required, Validators.minLength(1), Validators.maxLength(20) ]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [ Validators.required ])
  })

  public idPedidoCompra: number
  public itensCarrinho: ItemCarrinho[] = [] // array vazio

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService // o Angular irá procurar a injeção do serviço no app.module, já que ele não se encontra no provider deste componente
  ) { }

  ngOnInit() {
    
    this.itensCarrinho = this.carrinhoService.exibirItens()    
  }

  public confirmarCompra(): void {    

    // Se, ao clicar no botão de envio, o formulário estiver inválido, forçar a propriedade touched nos elementos para exibir se estão inválidos
    if (this.formulario.status === 'INVALID') {      
      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()
    }
    else {
      // Somente encaminha o pedido se houver itens no carrinho
      if(this.carrinhoService.exibirItens().length ===0) {
        alert('Você não selecionou nenhum item!')
      }
      else {
        let pedido: Pedido = new Pedido (
          this.carrinhoService.exibirItens(),
          this.formulario.value.endereco,
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaPagamento
        )

        this.idPedidoCompra = this.ordemCompraService.efetivarCompra(pedido)
        // Esvazia o carrinho
        this.carrinhoService.limparCarrinho()          
      }
    }    
  }

  // Esse método pode ser removido, pois é possível controlar a quantidade de itens do carrinho diretamente pelo template
  public adicionar(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item)
  }

  // Esse método pode ser removido, pois é possível controlar a quantidade de itens do carrinho diretamente pelo template
  public subtrair(item: ItemCarrinho): void {
    this.carrinhoService.subtrairQuantidade(item)
  }

  public remover(item: ItemCarrinho): void {
    this.carrinhoService.removerItem(item)
  }
}