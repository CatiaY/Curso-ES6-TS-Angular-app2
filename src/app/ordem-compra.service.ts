import { Pedido } from './shared/pedido.model'

export class OrdemCompraService {

    // Variável para simular o id do pedido
    public idPedido: number = 0

    constructor() {}
    
    // Retorna uma resposta para a aplicação
    public efetivarCompra(pedido: Pedido): number {        
        this.idPedido++
        return this.idPedido        
    }    
}