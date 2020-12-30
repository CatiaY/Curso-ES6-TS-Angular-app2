import { ItemCarrinho } from './item-carrinho.model'

export class Pedido {

    // Atributos implícitos criados no construtor
    constructor (
        public itens: Array<ItemCarrinho>,
        public endereco: string,
        public numero: string,
        public complemento: string,
        public formaPagamento: string
    ) {}
}